# Pinterest Product Feed Validation Report

Generated: 2026-08-19

## Summary

- Feed: `public/feeds/pinterest-products.csv`
- Expected production URL: https://dailyopsstudio.com/feeds/pinterest-products.csv
- Source of truth: `content/products/*.md`
- Active-product rule: `status: published`
- Products exported: 1
- Products skipped: 7
- Duplicate IDs: 0
- Duplicate product URLs: 0
- Invalid image URLs: 0
- Invalid prices: 0
- Exported products missing requested recommended fields: 0

## Exported Products

| ID | Product | Price | Link source | Image validation |
| --- | --- | --- | --- | --- |
| P001 | Restaurant Closing Checklist | 8.54 EUR | First-party product landing page | Local PNG exists; 2000 x 2000 px; absolute HTTPS feed URL is valid |

The source record does not contain an `etsyUrl`, so the feed uses the product's actual DailyOpsStudio landing page. No Etsy listing URL was inferred or invented.

## Skipped Products

| ID | Product source | Reason |
| --- | --- | --- |
| P002 | `restaurant-opening-checklist.md` | Status is `draft`, not active/published |
| P003 | `restaurant-daily-cleaning-checklist.md` | Status is `draft`, not active/published |
| P004 | `restaurant-kitchen-cleaning-checklist.md` | Status is `draft`, not active/published |
| P005 | `restaurant-inventory-checklist-stock-count-template.md` | Status is `draft`, not active/published |
| P006 | `restaurant-food-temperature-log.md` | Status is `draft`, not active/published |
| P007 | `restaurant-supplier-delivery-log.md` | Status is `draft`, not active/published |
| P008 | `restaurant-food-waste-log-waste-tracker.md` | Status is `draft`, not active/published |

## Field Validation

| Field | Result |
| --- | --- |
| `id` | Present, unique, stable source `productId`, 127 characters or fewer |
| `title` | Present, plain text, matches the product landing-page source, 500 characters or fewer |
| `description` | Present, plain text, no HTML, 10,000 characters or fewer |
| `link` | Present, absolute HTTPS product landing URL, 511 characters or fewer |
| `image_link` | Present, absolute HTTPS URL, 2,000 characters or fewer; local source image exists and exceeds Pinterest's minimum dimensions |
| `price` | Present, positive numeric amount plus ISO 4217 currency code |
| `availability` | Present and uses supported value `in stock` for the available digital product |
| `condition` | Present and uses supported value `new` |
| `brand` | Present as `DailyOpsStudio`, 100 characters or fewer |
| `item_group_id` | Not required because the source defines no variants |

## CSV Validation

- Header names use Pinterest's expected lowercase field names.
- Every field is double-quoted and embedded double quotes would require CSV doubling.
- Every row has the same nine columns.
- File is UTF-8 encoded.
- No currency symbols or zero prices are present.
- No duplicate IDs or links are present.

## Missing Recommended Data

None of the requested recommended fields are missing from exported rows. Other optional Pinterest attributes such as GTIN, MPN, additional images, ratings, and Google product category are absent from the source and were not invented.

## Hosting Check

The local image and feed paths are valid. Public HTTP accessibility of the feed, landing page, and image must be confirmed after the current build is deployed to `dailyopsstudio.com`; the production URLs could not be verified from the local source alone.

## Pinterest Rules Checked

Validated against Pinterest Business Help's current retail catalog requirements on 2026-08-19: required fields, supported availability values, price and ISO 4217 formatting, URL and text length limits, image dimensions, unique IDs, CSV quoting guidance, and UTF-8 encoding.
