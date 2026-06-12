---
title: "Book 2 Formulas"
parent: Formula Sheets
nav_order: 2
---

# Book 2 Formulas — Quantitative Analysis

Book 2 is the most calculation-dense book in Part I. Every formula below maps to a 2026 LO; the trap notes flag where GARP likes to hide distractors.

## Chapter 1 — Fundamentals of Probability

**Addition rule**

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

**Conditional probability**

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$

**Independence**

$$P(A \cap B) = P(A)\,P(B) \quad\Longleftrightarrow\quad P(A \mid B) = P(A)$$

**Trap:** *independent* ≠ *mutually exclusive*. Mutually exclusive events have $$P(A \cap B) = 0$$, so (with nonzero probabilities) they are strongly **dependent** — one occurring rules the other out.

**Law of total probability** (events $$B_i$$ partition the sample space)

$$P(A) = \sum_i P(A \mid B_i)\,P(B_i)$$

**Bayes' rule**

$$P(B_i \mid A) = \frac{P(A \mid B_i)\,P(B_i)}{\sum_j P(A \mid B_j)\,P(B_j)}$$

{: .tip }
On exam day, build a Bayes question as a table: prior × likelihood for every branch, then divide the branch of interest by the total. It is faster and safer than plugging into the formula.

## Chapter 2 — Random Variables

**Expectation and variance**

$$E[X] = \sum_x x\,P(X=x) \qquad \mathrm{Var}(X) = E[X^2] - \left(E[X]\right)^2$$

**Linear transformations** ($$a, b$$ constants)

$$E[aX + b] = a\,E[X] + b \qquad \mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)$$

**Trap:** the additive constant $$b$$ shifts the mean but **never** affects variance, and the multiplier enters variance **squared** (so standard deviation scales by $$|a|$$).

**Standardized higher moments**

$$\text{skew}(X) = \frac{E\left[(X-\mu)^3\right]}{\sigma^3} \qquad \text{kurt}(X) = \frac{E\left[(X-\mu)^4\right]}{\sigma^4}$$

Normal: skew = 0, kurtosis = 3. *Excess* kurtosis = kurtosis − 3; positive excess kurtosis (leptokurtosis) = fat tails.

## Chapter 3 — Common Univariate Random Variables

| Distribution | Parameters | Mean | Variance | Notes |
|---|---|---|---|---|
| Bernoulli | $$p$$ | $$p$$ | $$p(1-p)$$ | Single 0/1 trial (default indicator) |
| Binomial | $$n, p$$ | $$np$$ | $$np(1-p)$$ | Number of successes in $$n$$ iid trials |
| Poisson | $$\lambda$$ | $$\lambda$$ | $$\lambda$$ | Counts per interval; mean = variance |
| Uniform | $$a, b$$ | $$\frac{a+b}{2}$$ | $$\frac{(b-a)^2}{12}$$ | Continuous, flat density |
| Normal | $$\mu, \sigma^2$$ | $$\mu$$ | $$\sigma^2$$ | Skew 0, kurtosis 3; closed under addition |
| Lognormal | $$\mu, \sigma^2$$ of $$\ln X$$ | $$e^{\mu + \sigma^2/2}$$ | $$\left(e^{\sigma^2}-1\right)e^{2\mu+\sigma^2}$$ | $$\ln X \sim N$$; always positive, right-skewed |
| Chi-square | $$k$$ df | $$k$$ | $$2k$$ | Sum of $$k$$ squared standard normals |
| Student's $$t$$ | $$\nu$$ df | 0 ($$\nu>1$$) | $$\frac{\nu}{\nu-2}$$ ($$\nu>2$$) | Fatter tails than normal; → normal as $$\nu \to \infty$$ |
| $$F$$ | $$\nu_1, \nu_2$$ df | $$\frac{\nu_2}{\nu_2-2}$$ ($$\nu_2>2$$) | — | Ratio of scaled chi-squares; right-skewed |

**Binomial probability**

$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$

**Poisson probability**

$$P(X = k) = \frac{e^{-\lambda} \lambda^k}{k!}$$

**Standard normal transform**

$$z = \frac{x - \mu}{\sigma}$$

**Trap:** the lognormal mean is $$e^{\mu+\sigma^2/2}$$, **not** $$e^{\mu}$$ — the $$\sigma^2/2$$ correction is a favorite distractor. And a Poisson over $$t$$ periods has parameter $$\lambda t$$.

## Chapter 4 — Multivariate Random Variables

**Covariance and correlation**

$$\mathrm{Cov}(X,Y) = E[XY] - E[X]E[Y] \qquad \rho_{XY} = \frac{\mathrm{Cov}(X,Y)}{\sigma_X \sigma_Y} \in [-1, 1]$$

**Covariance algebra** (constants $$a,b,c,d$$)

$$\mathrm{Cov}(aX+b,\ cY+d) = ac\,\mathrm{Cov}(X,Y)$$

Additive constants drop out; correlation is unchanged by any positive linear rescaling.

**Variance of a linear combination**

$$\mathrm{Var}(aX + bY) = a^2\mathrm{Var}(X) + b^2\mathrm{Var}(Y) + 2ab\,\mathrm{Cov}(X,Y)$$

**Trap:** with a *minus* sign, $$\mathrm{Var}(X - Y) = \mathrm{Var}(X) + \mathrm{Var}(Y) - 2\,\mathrm{Cov}(X,Y)$$ — variances still **add**; only the covariance term flips sign.

**Independence ⇒ zero covariance**, but zero covariance does **not** imply independence (only rules out *linear* dependence).

**iid sums:** for $$n$$ iid draws, $$E\left[\sum X_i\right] = n\mu$$ and $$\mathrm{Var}\left(\sum X_i\right) = n\sigma^2$$.

## Chapter 5 — Sample Moments

**Sample mean and variance**

$$\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i \qquad s^2 = \frac{1}{n-1}\sum_{i=1}^{n}\left(X_i - \bar{X}\right)^2$$

The $$n-1$$ divisor makes $$s^2$$ unbiased (degrees-of-freedom correction).

**Standard error of the mean**

$$SE(\bar{X}) = \frac{s}{\sqrt{n}}$$

**Trap:** divide by $$\sqrt{n}$$, not $$n$$. The SE shrinks with sample size; the sample standard deviation $$s$$ does not systematically shrink.

**Sample skewness and kurtosis**

$$\hat{S} = \frac{\frac{1}{n}\sum\left(X_i-\bar{X}\right)^3}{\hat\sigma^3} \qquad \hat{K} = \frac{\frac{1}{n}\sum\left(X_i-\bar{X}\right)^4}{\hat\sigma^4}$$

{: .note }
Under normality the standard errors of sample skewness and excess kurtosis are approximately $$\sqrt{6/n}$$ and $$\sqrt{24/n}$$. Higher moments are estimated far less precisely than the mean — large skew/kurtosis estimates from small samples are unreliable, and tests like Jarque–Bera build on exactly these two statistics.

**Central limit theorem:** for iid data with finite variance, $$\bar{X}$$ is approximately $$N\!\left(\mu, \sigma^2/n\right)$$ for large $$n$$, regardless of the underlying distribution.

## Chapter 6 — Hypothesis Testing

**Test statistic for a mean** (σ known → z; σ estimated → t with $$n-1$$ df)

$$z = \frac{\bar{X} - \mu_0}{\sigma/\sqrt{n}} \qquad t_{n-1} = \frac{\bar{X} - \mu_0}{s/\sqrt{n}}$$

**Confidence interval for the mean**

$$\bar{X} \pm \text{(critical value)} \times \frac{s}{\sqrt{n}}$$

**Key two-tailed normal critical values:** 90% → 1.645, 95% → 1.96, 99% → 2.576. **One-tailed:** 95% → 1.645, 99% → 2.326.

**Trap:** read the tail structure before grabbing a critical value. A 95% *two-tailed* test uses 1.96; a 95% *one-tailed* test uses 1.645. Mixing these up is the single most common Chapter 6 error.

**Chi-square test of a variance** ($$n-1$$ df)

$$\chi^2 = \frac{(n-1)s^2}{\sigma_0^2}$$

**F-test for equality of two variances** (put the larger $$s^2$$ on top)

$$F = \frac{s_1^2}{s_2^2}, \qquad \text{df} = (n_1 - 1,\ n_2 - 1)$$

**Errors and power**

- Type I error: rejecting a true $$H_0$$; $$P(\text{Type I}) = \alpha$$ = the significance level.
- Type II error: failing to reject a false $$H_0$$; probability $$\beta$$.
- Power $$= 1 - \beta$$ = probability of correctly rejecting a false $$H_0$$.

{: .important }
For a fixed sample size, lowering $$\alpha$$ raises $$\beta$$ (lowers power) — you cannot reduce both error probabilities simultaneously except by increasing $$n$$ (or test efficiency, or effect size).

**p-value** = smallest significance level at which $$H_0$$ would be rejected. Reject when p-value < $$\alpha$$.

## Chapter 7 — Linear Regression

**Model:** $$Y_i = \alpha + \beta X_i + \epsilon_i$$

**OLS slope and intercept**

$$\hat\beta = \frac{\text{Cov}(X,Y)}{\text{Var}(X)} = \rho_{XY}\,\frac{s_Y}{s_X} \qquad \hat\alpha = \bar{Y} - \hat\beta\,\bar{X}$$

**Trap:** the denominator is the variance of the **explanatory** variable $$X$$. Swapping $$X$$ and $$Y$$ inverts the slope.

**Coefficient of determination**

$$R^2 = \frac{ESS}{TSS} = 1 - \frac{RSS}{TSS}$$

In a single-regressor model, $$R^2 = \rho_{XY}^2$$.

**t-statistic for a coefficient** (df $$= n - k - 1$$; $$k$$ = number of slopes)

$$t = \frac{\hat\beta - \beta_0}{SE(\hat\beta)}$$

$$\beta_0$$ is the hypothesized value — usually 0 (significance test), but hedging questions often test $$\beta_0 = 1$$. Use the value in the question, not reflexively zero.

## Chapter 8 — Regression with Multiple Explanatory Variables

**Adjusted R²**

$$\bar{R}^2 = 1 - \left(1 - R^2\right)\frac{n-1}{n-k-1}$$

Penalizes added regressors; can fall (and even go negative) when a useless variable is added, whereas plain $$R^2$$ never decreases.

**F-statistic for joint significance** (all $$k$$ slopes = 0)

$$F = \frac{R^2 / k}{\left(1 - R^2\right)/(n - k - 1)}$$

**Trap:** individually insignificant t-stats with a significant joint F-stat is the classic signature of **multicollinearity**.

**Dummy variables:** a categorical variable with $$m$$ categories needs $$m-1$$ dummies; including all $$m$$ plus an intercept causes perfect collinearity (the dummy variable trap).

## Chapter 9 — Regression Diagnostics

**Omitted variable bias** — occurs only when the omitted variable both (1) helps determine $$Y$$ and (2) is correlated with an included regressor. The included coefficient then absorbs the omitted effect:

$$\text{bias in } \hat\beta_1 \approx \beta_{\text{omit}} \times \frac{\mathrm{Cov}(X_1, X_{\text{omit}})}{\mathrm{Var}(X_1)}$$

**Heteroskedasticity** (non-constant error variance): OLS coefficient estimates stay unbiased and consistent, but the usual standard errors are wrong → t-stats and p-values unreliable. Fix the SEs with **White** (heteroskedasticity-robust) standard errors.

**Autocorrelated errors:** again coefficients are consistent (if regressors are exogenous) but SEs are wrong → use **Newey–West** standard errors, which are robust to *both* heteroskedasticity and autocorrelation.

{: .warning }
Neither White nor Newey–West changes the coefficient estimates — they only repair the standard errors. An answer choice claiming robust SEs "remove the bias in $$\hat\beta$$" is a distractor.

**Multicollinearity:** inflated coefficient SEs, unstable signs; detect via high $$R^2$$ with low t-stats or high variance inflation factors.

## Chapter 10 — Stationary Time Series

**Covariance stationarity:** constant mean, constant variance, and autocovariances that depend only on the lag $$h$$, not on time.

**AR(1)**

$$Y_t = \delta + \phi\,Y_{t-1} + \epsilon_t, \qquad |\phi| < 1 \text{ for stationarity}$$

**Long-run (mean-reversion) level**

$$E[Y] = \frac{\delta}{1-\phi}$$

**Variance and autocorrelations**

$$\mathrm{Var}(Y_t) = \frac{\sigma_\epsilon^2}{1-\phi^2} \qquad \rho_h = \phi^h$$

The ACF of an AR(1) decays geometrically and never cuts off exactly.

**h-step forecast** (reverts toward the long-run mean at rate $$\phi$$)

$$E_t[Y_{t+h}] = \frac{\delta}{1-\phi} + \phi^h\left(Y_t - \frac{\delta}{1-\phi}\right)$$

**MA(1)**

$$Y_t = \mu + \epsilon_t + \theta\,\epsilon_{t-1}$$

$$E[Y_t] = \mu \qquad \mathrm{Var}(Y_t) = \left(1+\theta^2\right)\sigma_\epsilon^2 \qquad \rho_1 = \frac{\theta}{1+\theta^2}, \quad \rho_h = 0 \ (h \ge 2)$$

**Trap:** $$\rho_1 \ne \theta$$. The MA(1) ACF **cuts off** after lag 1 (AR decays; MA truncates) — the standard identification clue. Also $$|\rho_1| \le 0.5$$ for any MA(1).

**ARMA(1,1)** combines both: geometric ACF decay after lag 1; always stationary if the AR root satisfies $$|\phi|<1$$.

## Chapter 11 — Nonstationary Time Series

**Random walk** (unit root: $$\phi = 1$$)

$$Y_t = Y_{t-1} + \epsilon_t \qquad \mathrm{Var}(Y_{t+h} \mid Y_t) = h\,\sigma_\epsilon^2$$

Variance grows linearly in the horizon, so the standard deviation scales with $$\sqrt{h}$$; shocks are permanent and there is no mean reversion. A random walk *with drift* adds $$\delta$$ each period: $$E_t[Y_{t+h}] = Y_t + \delta h$$.

**Augmented Dickey–Fuller (ADF) test:** regress $$\Delta Y_t$$ on $$Y_{t-1}$$ (plus lags/deterministics) and test $$H_0\!: \gamma = 0$$ (**unit root / nonstationary**) against $$\gamma < 0$$ (stationary).

{: .important }
ADF logic is inverted relative to intuition: **rejecting** the null is the *good* outcome — evidence the series is stationary. Failing to reject means you cannot rule out a unit root; first-difference the series before modeling.

**Other nonstationarities:** deterministic time trends (detrend or include $$t$$ as a regressor) and seasonality (seasonal dummies or seasonal differencing).

## Chapter 12 — Measuring Returns, Volatility, and Correlation

**Simple vs log returns**

$$R_t = \frac{P_t}{P_{t-1}} - 1 \qquad r_t = \ln\!\frac{P_t}{P_{t-1}} = \ln(1 + R_t)$$

Log returns add across time ($$r_{0,T} = \sum r_t$$); simple returns add across assets in a portfolio. Log return ≤ simple return always, and the gap grows with magnitude.

**Annualization** (independent returns)

$$\mu_{\text{annual}} = 252\,\mu_{\text{daily}} \qquad \sigma_{\text{annual}} = \sigma_{\text{daily}}\sqrt{252}$$

**Trap:** volatility scales with the **square root** of time; variance scales linearly.

**EWMA volatility update** (RiskMetrics $$\lambda = 0.94$$)

$$\sigma_t^2 = \lambda\,\sigma_{t-1}^2 + (1-\lambda)\,r_{t-1}^2$$

Weights decay geometrically; no mean reversion — the latest estimate is the forecast for all horizons.

**GARCH(1,1)**

$$\sigma_t^2 = \omega + \alpha\,r_{t-1}^2 + \beta\,\sigma_{t-1}^2$$

**Long-run (unconditional) variance**

$$\sigma_{LR}^2 = \frac{\omega}{1 - \alpha - \beta}, \qquad \alpha + \beta < 1$$

EWMA is the special case $$\omega = 0$$, $$\alpha + \beta = 1$$ (no mean reversion). The persistence $$\alpha + \beta$$ governs how fast forecasts revert to $$\sigma_{LR}^2$$.

{: .tip }
Work every EWMA/GARCH update in **variances**, not volatilities, and take the square root only at the end. Plugging in σ where σ² belongs is the most common error.

**Non-normality of returns:** fat tails and negative skew are stylized facts; rank-based measures (Spearman, Kendall) are robust to outliers and nonlinear monotone dependence, unlike Pearson correlation.

## Chapter 13 — Simulation and Bootstrapping

**Monte Carlo standard error**

$$SE = \frac{s}{\sqrt{N}}$$

$$s$$ = standard deviation of the simulated values, $$N$$ = number of replications. To halve the SE you need $$4\times$$ the replications; one extra digit of accuracy costs $$100\times$$.

**Variance reduction**

- **Antithetic variates:** pair each draw $$\epsilon$$ with $$-\epsilon$$; the negative correlation between paired estimates cuts variance.
- **Control variates:** simulate the error of a related problem with a known analytic answer and adjust the estimate by it.

**Bootstrapping** resamples *with replacement* from observed data instead of assuming a parametric distribution — it preserves the empirical distribution (including fat tails) but cannot generate scenarios outside the historical record and struggles with serially dependent data unless block methods are used.

## Chapter 14 — Machine Learning Methods

**MSE / bias–variance decomposition**

$$E\left[(\hat{Y} - Y)^2\right] = \text{Bias}^2 + \text{Variance} + \text{Irreducible error}$$

More complex models: lower bias, higher variance. Overfitting = low training error, high out-of-sample error. Combat with validation: split data into training / validation / test sets, or use K-fold cross-validation.

**Ridge regression** (L2 penalty)

$$\min_\beta\ \sum_{i}\left(Y_i - X_i\beta\right)^2 + \lambda \sum_{j} \beta_j^2$$

**LASSO** (L1 penalty)

$$\min_\beta\ \sum_{i}\left(Y_i - X_i\beta\right)^2 + \lambda \sum_{j} \left|\beta_j\right|$$

**Trap:** ridge **shrinks** coefficients toward zero but keeps them all; LASSO can set coefficients **exactly to zero**, performing variable selection. Larger $$\lambda$$ → more shrinkage → more bias, less variance. Standardize regressors before penalizing.

## Chapter 15 — Machine Learning and Prediction

**Confusion matrix** (positive = the event being predicted, e.g., default)

| | Predicted + | Predicted − |
|---|---|---|
| **Actual +** | TP | FN |
| **Actual −** | FP | TN |

$$\text{Accuracy} = \frac{TP+TN}{TP+TN+FP+FN} \qquad \text{Precision} = \frac{TP}{TP+FP} \qquad \text{Recall} = \frac{TP}{TP+FN}$$

$$F_1 = \frac{2 \times \text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$$

**Trap:** precision conditions on the **prediction** (of flagged loans, how many defaulted?); recall conditions on the **actual** outcome (of defaults, how many were caught?). With imbalanced classes, accuracy is misleading — a model predicting "no default" for everyone scores high accuracy and zero recall.

{: .note }
The ROC curve plots the true positive rate (recall) against the false positive rate across thresholds; AUC = 0.5 is a coin flip, 1.0 is perfect discrimination.
