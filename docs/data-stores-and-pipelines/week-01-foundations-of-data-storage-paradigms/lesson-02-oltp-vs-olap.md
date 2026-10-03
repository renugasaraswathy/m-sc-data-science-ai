---
title: "Lesson 2: OLTP vs OLAP"
---

[Data Stores & Pipelines](../../index.md) → <span class="week-crumb">Week 1: Foundations of Data Storage Paradigms</span> → Lesson 2: OLTP vs OLAP

---

# OLTP vs OLAP

## Key Concepts

### OLTP (Online Transaction Processing)
- Handles real-time insert/update/delete operations — CRUD
- Backed by ACID properties, so each transaction is reliable and consistent
- Examples: e-commerce apps, ride-sharing apps

### OLAP (Online Analytical Processing)
- Not built for real-time transactions — designed for analysing large volumes of data
- Used for business decision making
- Powerful: provides multi-dimensional views of data
- Examples: sales analytics (top-selling products by quarter), financial forecasting

### OLTP vs OLAP — Use Case Comparison

| Characteristic | OLTP | OLAP |
|---|---|---|
| Purpose | Day-to-day transactions | Historical data analysis |
| Data volume | Low to medium (real-time) | High volume (batch/historical) |
| Query types | Simple, fast (CRUD) | Complex (aggregations, joins) |
| DB type | Relational DB (MySQL, PostgreSQL) | DW / Columnar DB (Redshift, Snowflake) |
