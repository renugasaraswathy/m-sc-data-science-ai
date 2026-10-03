---
title: "Lesson 1: Introduction to the Perceptron and Logistic Neuron"
---

[Artificial Neural Networks](../../index.md) → <span class="week-crumb">Week 3: Perceptron and Logistic Neuron</span> → Lesson 1: Introduction to the Perceptron and Logistic Neuron

---

# Introduction to the Perceptron and Logistic Neuron

## Key Concepts

### From mathematics to the first neural models
- Week 2 gave the maths (vectors, gradients, chain rule, numerical stability). This week
  applies it to the **first real decision-making units**: the perceptron and the
  logistic (sigmoid) neuron.

### Roadmap
```mermaid
flowchart LR
    A["Perceptron<br/>linear classifier"] --> B["Learning rule<br/>how it learns from data"]
    B --> C["Linear separability<br/>and the XOR problem"]
    C --> D["Hidden layers<br/>why multilayer networks"]
    D --> E["Logistic neuron<br/>smooth, probabilistic output"]
```

- ★ Together these ideas explain **why multilayer networks are necessary**, and form the
  bridge to deeper architectures later.
