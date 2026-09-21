---
title: "Lesson 1: Evolution of AI, ML and Deep Learning"
---

[Artificial Neural Networks](../../index.md) → <span class="week-crumb">Week 1: Introduction to Neural Networks</span> → Lesson 1: Evolution of AI, ML and Deep Learning

---

# Evolution of AI, ML and Deep Learning

## Key Concepts

### 1. AI, ML and Deep Learning

#### What is Artificial Intelligence
- AI = goal-driven intelligent systems: a system that perceives its environment, makes
  decisions, and takes actions to maximize a defined objective.
- Runs as a continuous core loop, not a one-off calculation:

```mermaid
flowchart LR
    A["Perception"] --> B["Decision"]
    B --> C["Action"]
    C --> D["Feedback"]
    D --> A
```

- Common applications: autonomous driving, recommendation systems, fraud detection.

#### Two paradigms of AI
- Historically AI has been built two different ways — modern AI has shifted decisively
  toward the data-driven paradigm.

| | Symbolic AI | Data-driven AI |
|---|---|---|
| How it works | Logic and rules | Statistics and optimization |
| Knowledge source | Encoded manually by humans | Learned from data |
| Modern relevance | Earlier approach | Basis of modern AI |

#### Machine Learning
- Machine Learning = data-driven AI: the machine learns a function `f(x, θ)` from data,
  where `x` is the input data and `θ` are the model's parameters.
- Four key components work together as a pipeline:

```mermaid
flowchart LR
    A["Data"] --> B["Model"]
    B --> C["Loss Function"]
    C --> D["Optimization (Gradient Descent)"]
    D --> B
```

##### Limitations of classical Machine Learning
- Features are hand-engineered rather than learned — a human decides what inputs to
  extract from raw data.
- The model only learns parameters, not representations — it can't discover its own
  way of representing the data.

#### Deep Learning
- Deep Learning = Machine Learning with deep neural networks: networks built from
  multiple layers.
- Unlike classical ML, features, representations, and parameters are all learnt
  jointly by the network rather than engineered by hand.
- Neural networks add capabilities classical ML doesn't have:
    - Automatic feature learning
    - High-dimensional representation learning
    - End-to-end differentiable optimization
    - Large-scale optimization with millions of parameters

#### Relationship between AI, ML and DL
- Each is nested inside the one before it — DL is a subset of ML, which is a subset
  of AI.

```mermaid
flowchart TD
    subgraph AI["Artificial Intelligence — Intelligent behavior"]
        subgraph ML["Machine Learning — Learning from data"]
            DL["Deep Learning — Learning with deep neural networks"]
        end
    end
```

---

### 2. Why Deep Learning Works Today

#### Neural networks existed for decades, but only recently became state-of-the-art
- Their success today rests on four pillars: Data, Compute, Optimisation, and
  Architecture.

#### Data & compute make scale possible
- Modern models train on massive datasets — billions of images, billions of text
  samples, trillions of user interactions.
- Training cost scales as `O(n·p)`, where `n` = number of samples and `p` = number of
  parameters.
- Modern compute (GPU/TPU) provides fast parallel processing and efficient
  optimisation, making training at this scale practical.

#### Optimisation
- Deep learning has historically suffered from vanishing and exploding gradients,
  which made deep networks hard to train.
- These are largely solved today, enabling reliable training of much deeper networks.

#### Architecture
- One of the four pillars behind deep learning's current success, alongside Data,
  Compute, and Optimisation.
