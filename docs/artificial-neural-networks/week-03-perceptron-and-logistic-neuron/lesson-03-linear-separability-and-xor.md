---
title: "Lesson 3: Linear Separability and XOR"
---

[Artificial Neural Networks](../../index.md) → <span class="week-crumb">Week 3: Perceptron and Logistic Neuron</span> → Lesson 3: Linear Separability and XOR

---

# Linear Separability and XOR

## Key Concepts

### 1. Linear Separability and the XOR Limitation

#### Linear separability
- A dataset is **linearly separable** if some `w` and `b` satisfy
  `yᵢ(wᵀxᵢ + b) > 0` for **every** training example — all positives on one side, all
  negatives on the other.
- Boundary: a line in 2-D, a hyperplane in higher dimensions.
- Example of non-separable data: one class forming a circle with the other class in a
  concentric ring around it — no straight line can split them with good accuracy.

| | Linearly separable | Not linearly separable |
|---|---|---|
| Separating line | Exists (infinitely many possible) | None |
| Perceptron | Can classify perfectly; learning rule converges | Fails however long it trains or however it is initialised |

- ★ Success or failure of a perceptron is a **geometric property of the data**.
- On non-separable data the rule **oscillates**: fixing one point breaks another, so it
  never stops updating.

#### The XOR problem
- Output is positive when the two inputs **differ**, and 0 when they are the same.

| x₁ | x₂ | XOR |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

- Plotted, the points of each class sit **diagonally opposite** each other, so no single
  line separates them.
- XOR is the simplest, clearest demonstration of a single-layer limit.
- It is a teaching example, not a real-world use case. Real data can show similar
  patterns but noisier, and you only learn the true shape of the data once models are
  fitted.

---

### 2. Multi-Layer Networks and XOR

#### The limitation is structural
- The failure isn't due to poor learning, bad initialisation, or too little data. One
  perceptron makes **one boundary → two regions**; XOR needs the space split into
  several regions.

#### How a hidden layer helps
```mermaid
flowchart LR
    X["Inputs x₁, x₂"] --> H1["Hidden neuron 1<br/>linear split A"]
    X --> H2["Hidden neuron 2<br/>linear split B"]
    H1 --> O["Output neuron<br/>combines the splits"]
    H2 --> O
    O --> Y["Final decision"]
```

- Two boundaries `D1` and `D2` = **two perceptrons** whose outputs are combined by a
  logical rule: outside `D1` or outside `D2` → class 0; **between** them → class 1.
- Each hidden neuron learns its **own linear separator**; the output neuron combines
  them into the final decision.
- For XOR: two lines are drawn; points **between** the lines are one class, points
  **outside** are the other.
- ★ Composing several linear cuts gives **nonlinear decision regions**. XOR needs at
  least one hidden layer.
- **How many layers?** Depends on the complexity of the data: linearly separable →
  one layer is enough; strongly non-linear (e.g. the circular data) → many hidden
  layers to reach a decent accuracy.
- Every neuron is still linear (`wᵀx + b`); a network layers many of these and joins
  them with a **nonlinear function** — non-linear behaviour is built from combined
  linear pieces.
- Multilayer networks are strictly **more expressive** than a single perceptron —
  greater expressive power, not just better learning rules, is why deeper networks win.
