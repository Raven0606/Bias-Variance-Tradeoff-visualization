# [Bias-Variance Tradeoff Visualization](https://raven0606.github.io/Bias-Variance-Tradeoff-visualization/)

In machine learning, every model faces a central challenge: perform perfectly on known training data, or generalize effectively to new, unseen data. You rarely get to have both. This push-and-pull is the **Bias-Variance Tradeoff**. Navigating this is the key to building predictive models that work in the real world.

## Core Concepts

* **Bias:** The error introduced by approximating a real-world problem with a simplified model. High bias leads to **underfitting**.
* **Variance:** The error introduced when a model is highly sensitive and captures the noise instead of the signal. High variance leads to **overfitting**.

## What's on the Site

The site includes three main visualizations to help you understand the tradeoff:
1. **Interactive Data Fit:** A sandbox to see how underfit, optimal, and overfit models map to data points.
2. **The Target Analogy:** A classic bullseye visualization showing Low/High Bias and Low/High Variance.
3. **The Tradeoff Curve:** A chart demonstrating how Total Error changes as model complexity increases.

## The Math

`Error = Bias² + Variance + ε`

*(ε represents irreducible error from unobserved variables or fundamental randomness. No model can perform better than ε).*

## Managing the Tradeoff

Techniques to find the optimal balance between bias and variance include:
* **Cross-Validation:** Splits the dataset into training and testing folds to detect overfitting.
* **Regularization:** Introduces a penalty for complexity (e.g., L1 Lasso, L2 Ridge) to reduce variance.
* **Feature Selection:** Removes irrelevant or noisy features to create a simpler model.

> *"To learn is to balance."*
