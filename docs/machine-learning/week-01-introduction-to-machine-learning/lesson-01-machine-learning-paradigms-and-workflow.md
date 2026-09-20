---
title: "Lesson 1: Machine Learning Paradigms and Workflow"
---

[Machine Learning](../index.md) → <span class="week-crumb">Week 1: Introduction to Machine Learning</span> → Lesson 1: Machine Learning Paradigms and Workflow

---

# Machine Learning Paradigms and Workflow

## Summary
Machine Learning emerged because digitizing everyday physical experience generated
huge volumes of data, creating a need to extract patterns and knowledge from it. This
lecture traces that shift through four historical paradigms of discovery, defines ML,
and introduces two standard workflows for turning raw data into knowledge (KDD and
CRISP-DM), plus a business-intelligence view of the same journey. It then zooms into
**supervised learning** — learning from labelled data — covering its two flavors
(classification and regression) and the training/validation/test workflow used to
build and evaluate a model. It then covers **unsupervised learning** — finding hidden
patterns in unlabelled data — through its two main tasks, clustering and association
rule mining. Finally, it covers **practical considerations** — real-world challenges
(scalability, dimensionality, data quality, and more) that a machine learning pipeline
needs to handle beyond the core algorithms.

## Key Concepts

### 1. Foundations of Machine Learning

#### Why Machine Learning emerged
- Physical, real-world experiences are increasingly captured as digital data (sensors,
  transactions, clicks, images, etc.).
- This digitization → massive volumes of generated data.
- Volume alone isn't useful — the value is in finding patterns and extracting
  knowledge from that data, which is what ML/data science does.

#### The four paradigms of scientific discovery
Each era added a new way of generating knowledge, building on the previous one rather
than replacing it.

```mermaid
timeline
    title Paradigms of Discovery
    Before 1600 : Empirical Science : knowledge from direct observation of the world
    1600 - 1950 : Theoretical Science : knowledge from models and generalizing observations into laws/theories
    1950 - 1990 : Computer Science : knowledge from running simulations of models too complex to solve analytically
    1990 - Now : Data Science / ML : knowledge from uncovering patterns in massive, real-world datasets, often without a hand-built theoretical model first
```

#### Definition of Machine Learning
> The field of study that gives computers the ability to learn without being
> explicitly programmed.

- Contrast with classical programming: instead of hand-coding rules, the system infers
  rules/patterns from data.

#### KDD (Knowledge Discovery in Databases)
The classic pipeline for going from raw data to actionable knowledge.

```mermaid
flowchart LR
    A[Databases<br/>raw data] --> B[Data Integration]
    B --> C[Data Cleaning]
    C --> D[Data Warehouse]
    D --> E[Selection<br/>task-relevant data]
    E --> F[Data Mining]
    F --> G[Pattern Evaluation]
    G --> H[Knowledge]
```

- Each stage narrows and refines the data until only task-relevant, validated patterns
  remain as "knowledge."
- **Data Mining** here is the pattern-extraction step, not the whole pipeline.

#### CRISP-DM (Cross Industry Standard Process for Data Mining)
The most widely used industry framework for data mining/ML projects — organizes the
same idea as KDD around 5 phases.

```mermaid
flowchart TD
    A[Business Understanding] --> C[Prepare Data]
    B[Data Understanding] --> C
    C --> D[Building Model<br/>using Algorithms]
    T[Training Data] --> D
    D --> E["Applying Model &<br/>Performance Evaluation"]
    Te[Test Data] --> E
    E --> F[Deployment]
    F --> G[Knowledge and Actions]
```

| Phase | Stage(s) | What happens |
|---|---|---|
| 1. Prior Knowledge | Business Understanding, Data Understanding | Understand the problem and the data available before touching a model |
| 2. Preparation | Prepare Data | Clean/transform data into a usable form |
| 3. Modeling | Building Model using Algorithms | Train models using training data |
| 4. Application | Applying Model and Performance Evaluation | Evaluate the model against test data |
| 5. Knowledge | Deployment → Knowledge and Actions | Deploy the model and act on what it produces |

- Why it matters: gives teams a repeatable, industry-standard checklist so an ML
  project doesn't skip straight from data to model without understanding the business
  problem first.

#### The Business Intelligence (BI) view
Same overall journey (data → decisions) but framed by *who* does each step and *how
much value* each layer adds — shown as a pyramid, increasing potential to support
business decisions as you go up.

```mermaid
flowchart TD
    A["Data Sources (DBA)<br/>raw data from files, web, DBs"] --> B["Data Exploration (Data Analyst)<br/>statistical summary, querying & reporting"]
    B --> C["Data Mining (Data Analyst)<br/>information discovery / discovering new information"]
    C --> D["Data Presentation (Business Analyst)<br/>visualization techniques"]
    D --> E["Decision Making (End User)<br/>using insights to make business decisions"]
```

- Why it matters: connects the technical pipeline (KDD/CRISP-DM) to organizational
  roles — a DBA, data analyst, business analyst, and end user each own a layer, and
  value/decision-support potential increases as data moves up the pyramid.

#### Types of data used in ML
- **Structured** — fits a fixed schema (e.g. relational tables).
- **Unstructured** — no fixed schema (e.g. free text, images).
- **Time-variant data** — values change over time.
- **Advanced/specialized data types:**
    - **Data stream & sensor data** — continuous, high-velocity data from sensors/IoT.
    - **Time series & sequence data** — ordered observations over time.
    - **Spatial and spatio-temporal data** — location-based, e.g. GPS tracking data.
    - **WWW (web) data** — data generated by/on the web.

#### How machines learn: prediction vs. description
Two fundamental approaches to machine learning, split by whether the "correct answer"
is known in advance.

| | Prediction Methods (Supervised Learning) | Description Methods (Unsupervised Learning) |
|---|---|---|
| Goal | Predict an unknown value | Find interesting, human-interpretable patterns that describe the data |
| How | Learns from examples where the "correct answer" is already known | Explores the data on its own, without any "correct answers" |

---

### 2. Supervised Learning

#### Definition and types
- **Definition:** learning from labelled data — each training example has a known
  correct answer, called a **class label**.
- Why it matters: this is the "prediction methods" branch above — the model's job is
  to generalize from labelled examples to predict the label/value of unseen data.
- Two types: **classification** (predicts a category) and **regression** (predicts a
  numerical value).

A training set is a set of attributes plus the class label/target to predict; the
goal in both cases is to predict that target for an unseen record (not part of the
training set) as accurately as possible.

| | Classification | Regression |
|---|---|---|
| Predicts | A category/class from a **finite** set of possible values | A **continuous** numerical value |
| Examples | rain/no rain, churn/no churn, news article category, dog vs. cat in an image | house price, petrol price, gold price, sales next year, stock price tomorrow, wind velocity and temperature |
| Real-world use cases | Credit card fraud detection, direct marketing, churn detection (stay or leave the platform) | Sales forecasting, price prediction |
| Evaluation metric(s) | Accuracy, precision | Mean Absolute Error (MAE) |

#### Training / Validation / Test workflow
How a supervised model is built and evaluated without "cheating" by testing on data
it was trained on.

```mermaid
flowchart TD
    A[Train Model on Training Set] --> B[Evaluate Model on Validation Set]
    B -->|Tweak model according to results| A
    B --> C[Pick model that does best on Validation Set]
    C --> D[Confirm results on Test Set]
```

- **Training set:** used to fit the model.
- **Validation set:** used to evaluate and tweak the model (e.g. choosing
  hyperparameters or comparing candidate models) without touching the test set.
- **Test set:** held out until the end, used once to confirm the chosen model's
  real-world performance.
- Why it matters: prevents overfitting to a single dataset — tweaking decisions happen
  on the validation set, so the test set gives an unbiased final performance estimate.

---

### 3. Unsupervised Learning

#### Definition
- No labels and no correct answers in the data.
- Goal isn't prediction — it's finding hidden patterns and structure in the data
  (knowledge discovery).
- This is the "description methods" branch from the prediction vs. description table
  in Foundations of Machine Learning above.

#### Clustering vs. association rule mining

| | Clustering | Association rule mining |
|---|---|---|
| Goal | Group data points so points within one cluster are similar to each other, and points in different clusters are dissimilar | Find relationships between variables, producing dependency rules that predict an item's occurrence from other items occurring in the same transaction |
| How | Minimize intra-cluster distance, maximize inter-cluster distance (distance is inversely proportional to similarity) | Mine transaction data for dependency patterns between items |
| Real-world use cases | News grouping, stock market analysis (stocks that move up/down together), market segmentation | Marketing and sales promotion (e.g. if samosa is bought, coke is also likely to be bought), supermarket shelf management, inventory management |

---

### 4. Practical Considerations in Machine Learning

#### Real-world challenges
A machine learning pipeline needs to hold up against practical, real-world conditions
beyond just picking a good algorithm.

- **Scalability** — the pipeline should handle exponentially growing data, with
  efficient processing and memory usage.
- **Dimensionality** — a high number of features means the model has to cope with
  more features; the data required to support them grows exponentially with the
  number of features, and more features also lead to sparsity.
- **Complex & heterogeneous data** — data arrives from various sources and mixed
  types (audio, video, sensors); the pipeline should handle this complexity
  effectively and efficiently.
- **Data quality** — noise, inconsistencies, and missing values are common; the
  pipeline should handle these data quality issues.
- **Data ownership & distribution** — sharing and integrating data from different
  sources raises both political and technical challenges that the pipeline should
  handle.
- **Privacy preservation** — PII must be stored ethically and legally in a protected
  environment (e.g. in line with GDPR).
- **Streaming data** — the pipeline should be able to handle continuous, streaming
  data, not just static batches.

## Worked Examples
No worked numerical/algorithmic example in this lecture — it was conceptual/framework
introduction. Worked examples begin from the next lecture applying CRISP-DM/KDD, and
specific classification/regression algorithms, to actual datasets.

## Glossary
| Term | Definition |
|------|------------|
| KDD | Knowledge Discovery in Databases — pipeline from raw data to knowledge (Databases → Integration → Cleaning → Warehouse → Selection → Data Mining → Pattern Evaluation → Knowledge) |
| CRISP-DM | Cross Industry Standard Process for Data Mining — 5-phase industry-standard ML project framework (Prior Knowledge, Preparation, Modeling, Application, Knowledge) |
| Data Mining | The step of extracting patterns/information from prepared data |
| Structured data | Data with a fixed schema (e.g. tables) |
| Unstructured data | Data without a fixed schema (e.g. text, images) |
| Spatio-temporal data | Data with both location and time dimensions (e.g. GPS tracks) |
| Supervised learning | Learning from labelled data, where the correct answer (class label) is known during training |
| Class label | The known "correct answer" attached to a training example |
| Classification | Supervised learning task predicting a category from a finite set of classes |
| Regression | Supervised learning task predicting a continuous numerical value |
| Training set | Data used to fit/train the model |
| Validation set | Held-out data used to evaluate and tweak the model during development |
| Test set | Held-out data used once, at the end, to confirm final model performance |
| MAE (Mean Absolute Error) | Average of the absolute differences between predicted and actual values — a regression evaluation metric |
| Unsupervised learning | Learning from unlabelled data, with no correct answers given — finds hidden patterns/structure instead of predicting a known target |
| Clustering | Grouping data points so points within a group are similar and points across groups are dissimilar |
| Intra-cluster distance | Distance between points within the same cluster — minimized in clustering |
| Inter-cluster distance | Distance between points in different clusters — maximized in clustering |
| Association rule mining | Finding dependency rules that predict an item's occurrence based on other items occurring in the same transaction |
| Dimensionality | The number of features in a dataset — high dimensionality requires exponentially more data and leads to sparsity |
| Sparsity | A dataset having few non-zero/meaningful values relative to its (high-dimensional) feature space |
| PII | Personally Identifiable Information — data requiring ethical/legal (e.g. GDPR) protection |
