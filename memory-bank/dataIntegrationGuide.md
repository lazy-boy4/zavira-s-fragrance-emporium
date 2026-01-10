# Data Integration Guide - Google Sheets vs Notion

This document provides guidance for Agent B on implementing real-time data integration for visitor and customer analytics.

---

## Recommendation: Google Sheets

**For Zavira's use case, Google Sheets is recommended** over Notion for the following reasons:

### Why Google Sheets?

1. **Better for Tabular Data**
   - E-commerce data (orders, customers, products) is inherently tabular
   - Google Sheets handles large datasets better than Notion databases
   - Native formulas and pivot tables for analysis

2. **Superior Integration Options**
   - Google Sheets API is more mature and widely supported
   - Better webhook support via Apps Script
   - Native integration with Google Analytics, Looker Studio

3. **Real-Time Sync Capabilities**
   - Sheets API supports batch updates efficiently
   - Lower latency for high-frequency updates
   - Better handling of concurrent writes

4. **Business Analytics**
   - Direct connection to Google Looker Studio (Data Studio)
   - Easy chart/dashboard creation
   - Automated reporting via Apps Script

5. **Cost Effective**
   - Free tier handles significant volume
   - No per-seat licensing for viewers
   - Google Workspace likely already in use

### When Notion Might Be Better

- Content-heavy use cases (documentation, wiki)
- Complex relational data with many linked databases
- Team collaboration on unstructured data
- Project management alongside data

---

## Implementation Architecture

### System Overview

```
┌──────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Zavira Website  │────▶│   Go Backend    │────▶│  Google Sheets  │
│  (React/Next.js) │     │   API Server    │     │   (via API)     │
└──────────────────┘     └─────────────────┘     └─────────────────┘
         │                        │                       │
         │                        ▼                       ▼
         │               ┌─────────────────┐     ┌─────────────────┐
         │               │   PostgreSQL    │     │  Looker Studio  │
         │               │   (Primary DB)  │     │   (Dashboards)  │
         └──────────────▶└─────────────────┘     └─────────────────┘
                              (Real-time)
```

### Data Flow

1. **Website Events** → Backend API → PostgreSQL (primary storage)
2. **Background Job** → Sync PostgreSQL → Google Sheets (analytics mirror)
3. **Google Sheets** → Looker Studio (visualization)

---

## Google Sheets Setup

### Required Sheets Structure

#### 1. Visitors Sheet
```
| timestamp | session_id | page | source | device | country | city |
|-----------|------------|------|--------|--------|---------|------|
```

#### 2. Customers Sheet
```
| customer_id | email | name | phone | created_at | total_orders | total_spent | source |
|-------------|-------|------|-------|------------|--------------|-------------|--------|
```

#### 3. Orders Sheet
```
| order_id | order_number | customer_id | total | status | payment_method | created_at |
|----------|--------------|-------------|-------|--------|----------------|------------|
```

#### 4. Order Items Sheet
```
| order_id | product_id | product_name | variant | quantity | unit_price | total |
|----------|------------|--------------|---------|----------|------------|-------|
```

#### 5. Products Performance Sheet
```
| product_id | name | views | add_to_cart | purchases | revenue | conversion_rate |
|------------|------|-------|-------------|-----------|---------|-----------------|
```

---

## Backend Implementation

### Environment Variables Required

```env
# Google Sheets Integration
GOOGLE_SHEETS_CREDENTIALS_JSON=<base64-encoded-service-account-json>
GOOGLE_SHEETS_SPREADSHEET_ID=<your-spreadsheet-id>

# Sync Configuration
DATA_SYNC_INTERVAL=60        # seconds between syncs
DATA_SYNC_BATCH_SIZE=100     # rows per batch
```

### Go Implementation Pattern

```go
package sheets

import (
    "context"
    "google.golang.org/api/sheets/v4"
    "google.golang.org/api/option"
)

type SheetsClient struct {
    service       *sheets.Service
    spreadsheetId string
}

func NewSheetsClient(credentialsJSON []byte, spreadsheetId string) (*SheetsClient, error) {
    ctx := context.Background()
    srv, err := sheets.NewService(ctx, option.WithCredentialsJSON(credentialsJSON))
    if err != nil {
        return nil, err
    }
    return &SheetsClient{
        service:       srv,
        spreadsheetId: spreadsheetId,
    }, nil
}

// AppendRows adds new data rows to a sheet
func (c *SheetsClient) AppendRows(sheetName string, rows [][]interface{}) error {
    range_ := sheetName + "!A:Z"
    valueRange := &sheets.ValueRange{
        Values: rows,
    }
    _, err := c.service.Spreadsheets.Values.Append(
        c.spreadsheetId,
        range_,
        valueRange,
    ).ValueInputOption("USER_ENTERED").Do()
    return err
}

// SyncVisitors syncs visitor data from PostgreSQL to Sheets
func (c *SheetsClient) SyncVisitors(visitors []Visitor) error {
    rows := make([][]interface{}, len(visitors))
    for i, v := range visitors {
        rows[i] = []interface{}{
            v.Timestamp.Format(time.RFC3339),
            v.SessionID,
            v.Page,
            v.Source,
            v.Device,
            v.Country,
            v.City,
        }
    }
    return c.AppendRows("Visitors", rows)
}
```

### Background Sync Job

```go
package jobs

import (
    "time"
    "log"
)

type DataSyncJob struct {
    db           *sql.DB
    sheetsClient *sheets.SheetsClient
    interval     time.Duration
    lastSync     time.Time
}

func (j *DataSyncJob) Run() {
    ticker := time.NewTicker(j.interval)
    defer ticker.Stop()

    for {
        select {
        case <-ticker.C:
            j.syncAll()
        }
    }
}

func (j *DataSyncJob) syncAll() {
    // Get records since last sync
    visitors, _ := j.db.GetVisitorsSince(j.lastSync)
    orders, _ := j.db.GetOrdersSince(j.lastSync)
    customers, _ := j.db.GetCustomersSince(j.lastSync)

    // Sync to sheets
    if len(visitors) > 0 {
        j.sheetsClient.SyncVisitors(visitors)
    }
    if len(orders) > 0 {
        j.sheetsClient.SyncOrders(orders)
    }
    if len(customers) > 0 {
        j.sheetsClient.SyncCustomers(customers)
    }

    j.lastSync = time.Now()
    log.Printf("Synced %d visitors, %d orders, %d customers", 
        len(visitors), len(orders), len(customers))
}
```

---

## Visitor Tracking Implementation

### Frontend Tracking (React/Next.js)

```typescript
// lib/analytics.ts
interface TrackingEvent {
  type: 'page_view' | 'product_view' | 'add_to_cart' | 'purchase';
  page: string;
  productId?: string;
  metadata?: Record<string, any>;
}

class Analytics {
  private sessionId: string;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
  }

  private getOrCreateSessionId(): string {
    let id = sessionStorage.getItem('session_id');
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem('session_id', id);
    }
    return id;
  }

  async track(event: TrackingEvent): Promise<void> {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...event,
          sessionId: this.sessionId,
          timestamp: new Date().toISOString(),
          referrer: document.referrer,
          userAgent: navigator.userAgent,
        }),
      });
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  }

  pageView(page: string): void {
    this.track({ type: 'page_view', page });
  }

  productView(productId: string): void {
    this.track({ type: 'product_view', page: window.location.pathname, productId });
  }

  addToCart(productId: string, quantity: number): void {
    this.track({ 
      type: 'add_to_cart', 
      page: window.location.pathname, 
      productId,
      metadata: { quantity }
    });
  }
}

export const analytics = new Analytics();
```

### Backend API Endpoint

```go
// handlers/analytics.go
type TrackRequest struct {
    Type      string                 `json:"type"`
    Page      string                 `json:"page"`
    SessionID string                 `json:"sessionId"`
    ProductID string                 `json:"productId,omitempty"`
    Timestamp string                 `json:"timestamp"`
    Referrer  string                 `json:"referrer"`
    UserAgent string                 `json:"userAgent"`
    Metadata  map[string]interface{} `json:"metadata,omitempty"`
}

func (h *Handler) TrackEvent(w http.ResponseWriter, r *http.Request) {
    var req TrackRequest
    json.NewDecoder(r.Body).Decode(&req)

    // Parse user agent for device info
    device := parseUserAgent(req.UserAgent)
    
    // Get geo info from IP (using MaxMind or similar)
    geo := h.geoIP.Lookup(r.RemoteAddr)

    // Store in database
    event := &AnalyticsEvent{
        Type:      req.Type,
        SessionID: req.SessionID,
        Page:      req.Page,
        ProductID: req.ProductID,
        Device:    device,
        Country:   geo.Country,
        City:      geo.City,
        Referrer:  req.Referrer,
        Metadata:  req.Metadata,
        CreatedAt: time.Now(),
    }

    h.db.InsertAnalyticsEvent(event)
    w.WriteHeader(http.StatusNoContent)
}
```

---

## Email Integration

### Company Email Connection

For connecting website to company email (notifications, order confirmations):

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@zavira.com
SMTP_PASSWORD=<app-specific-password>
SMTP_FROM_NAME=Zavira Parfums
SMTP_FROM_EMAIL=info@zavira.com
```

### Email Templates to Implement

1. **Order Confirmation** - Sent immediately after purchase
2. **Shipping Notification** - When order ships
3. **Delivery Confirmation** - When delivered
4. **Newsletter Welcome** - When user subscribes
5. **Password Reset** - Security emails
6. **Account Verification** - Email verification

---

## Security Considerations

1. **API Keys**: Store Google credentials securely (env vars, secrets manager)
2. **Data Privacy**: Comply with GDPR/local privacy laws
3. **Rate Limiting**: Implement rate limits on tracking endpoints
4. **Data Retention**: Define retention policy for visitor data
5. **Access Control**: Limit Sheets access to authorized personnel

---

## Alternative: Notion Integration

If the team decides to use Notion instead:

### Notion API Setup
```env
NOTION_API_KEY=<integration-token>
NOTION_DATABASE_ORDERS=<database-id>
NOTION_DATABASE_CUSTOMERS=<database-id>
NOTION_DATABASE_ANALYTICS=<database-id>
```

### Limitations to Consider
- 400 blocks per page limit
- Rate limits (3 requests/second)
- No native formulas like Sheets
- Higher latency for data sync
- Complex querying requires workarounds

---

## Implementation Priority

1. **Phase 1**: Set up Google Sheets with manual export
2. **Phase 2**: Implement backend sync job for real-time updates
3. **Phase 3**: Add frontend visitor tracking
4. **Phase 4**: Create Looker Studio dashboards
5. **Phase 5**: Set up email notifications

---

*This guide should be used by Agent B when implementing the data integration layer.*
*Recommendation: Start with Google Sheets for its superior analytics capabilities.*
