---
title: "Lesson 1: Why We Need Mathematical Foundations"
---

[Artificial Neural Networks](../../index.md) → <span class="week-crumb">Week 2: Mathematical Foundations for Neural Networks</span> → Lesson 1: Why We Need Mathematical Foundations

---

# Why We Need Mathematical Foundations

## Key Concepts

### From concepts to mathematics
- Week 1 covered the concepts: neurons, layers, feed-forward networks, real-world uses.
- Open question: ★ **how does a neural network actually learn from data?**
- Answering it needs maths. Learning is driven by **linear algebra**, **calculus**, and
  **systematic gradient computation**.

### What this week covers
```mermaid
flowchart LR
    A["Linear algebra<br/>vectors, matrices, tensors,<br/>dot product, matrix ops"] --> B["Derivatives<br/>partial derivatives,<br/>gradient vector"]
    B --> C["Chain rule<br/>gradients through<br/>multiple layers"]
    C --> D["Numerical stability<br/>overflow, underflow"]
    D --> E["Ready for perceptrons<br/>and deep networks"]
```

- Without these tools, backpropagation, multilayer learning, loss minimisation and
  optimisation can't be understood properly.

### How to approach it
- No need to memorise formulas.
- Understand **what each mathematical object represents**, build geometric intuition,
  and connect every equation to what the network is doing.
- It works as a targeted refresher — only the maths neural networks actually use.
