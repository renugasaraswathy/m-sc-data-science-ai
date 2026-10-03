---
title: "Lesson 5: Module Summary"
---

[Artificial Neural Networks](../../index.md) → <span class="week-crumb">Week 3: Perceptron and Logistic Neuron</span> → Lesson 5: Module Summary

---

# Module Summary

## Key Concepts

### The big picture
```mermaid
flowchart TD
    A["Perceptron<br/>linear score + hard threshold = binary classifier"] --> B["Geometric limit<br/>only one straight boundary"]
    B --> C["XOR cannot be separated<br/>by any single line"]
    C --> D["Hidden layer<br/>multiple linear splits recombined<br/>→ nonlinear regions"]
    A --> E["Logistic neuron<br/>sigmoid replaces hard threshold<br/>→ probabilistic output"]
    D --> F["Multilayer networks"]
    E --> F
```

- The perceptron works when data is linearly separable, a very restrictive assumption.
- The fix for XOR-type problems is a change of **architecture**, not just the neuron.

### What's next
- Architecture of multilayer perceptrons: hidden layers and forward paths
- Nonlinearity and activation functions
- Associated practical issues
