---
title: "Book 1 Formulas"
parent: Formula Sheets
nav_order: 1
---

# Book 1 Formulas — Foundations of Risk Management

Calculations cluster in Chapters 5–7 (plus the EL formula from Chapter 1). Every formula below is fair game.

## Chapter 1 — Expected loss

$$EL = PD \times LGD \times EAD$$

$$PD$$ = probability of default; $$LGD$$ = loss given default $$= 1 - \text{recovery rate}$$; $$EAD$$ = exposure at default.

**Trap:** EL is a *cost* covered by pricing/provisions; *unexpected* loss is what capital covers.

## Chapter 5 — MPT and CAPM

**Portfolio expected return**

$$E[R_p] = \sum_i w_i\,E[R_i]$$

**Covariance and correlation**

$$\mathrm{Cov}(R_1,R_2) = \rho_{12}\,\sigma_1\sigma_2 \qquad \rho_{12} = \frac{\mathrm{Cov}(R_1,R_2)}{\sigma_1\sigma_2}$$

**Two-asset portfolio variance**

$$\sigma_p^2 = w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2w_1w_2\,\rho_{12}\,\sigma_1\sigma_2$$

**Trap:** the cross term uses $$2w_1w_2$$ — forgetting the 2 is the most common arithmetic error. Take the square root at the very end for $$\sigma_p$$.

**Beta**

$$\beta_i = \frac{\mathrm{Cov}(R_i,R_m)}{\sigma_m^2} = \rho_{im}\,\frac{\sigma_i}{\sigma_m}
\qquad \beta_p = \sum_i w_i\,\beta_i$$

**CAPM (= the SML)**

$$E[R_i] = R_f + \beta_i\left(E[R_m] - R_f\right)$$

**Capital market line (efficient portfolios only)**

$$E[R_p] = R_f + \frac{E[R_m]-R_f}{\sigma_m}\,\sigma_p$$

**Trap:** SML prices *all* assets using **beta**; CML applies only to *efficient* portfolios using **total risk σ**. Given σ of an individual stock, you cannot use the CML — convert to beta via $$\rho\,\sigma_i/\sigma_m$$.

## Chapter 6 — APT and multifactor models

**Return-generating (factor) model**

$$R_i = E[R_i] + \beta_{i1}F_1 + \cdots + \beta_{iK}F_K + e_i$$

$$F_k$$ = factor **surprise** (actual − expected, mean zero); $$e_i$$ = idiosyncratic return.

**APT pricing**

$$E[R_i] = R_f + \beta_{i1}\lambda_1 + \beta_{i2}\lambda_2 + \cdots + \beta_{iK}\lambda_K$$

$$\lambda_k$$ = risk premium on factor $$k$$ (excess return of the pure factor portfolio).

**Trap:** premiums $$\lambda$$ multiply betas in *expected* return; surprises $$F$$ multiply betas in *realized* return. An announcement that matches expectations has surprise = 0 and moves nothing.

**Fama–French three-factor model**

$$E[R_i] - R_f = \beta_{i,m}\left(E[R_m]-R_f\right) + \beta_{i,SMB}\,E[SMB] + \beta_{i,HML}\,E[HML]$$

$$SMB$$ = small-minus-big (size premium); $$HML$$ = high-minus-low book-to-market (value premium). Positive HML beta = value tilt; negative = growth.

## Chapter 7 — Risk-adjusted performance

**Sharpe ratio** (total risk)

$$S_p = \frac{E[R_p] - R_f}{\sigma_p}$$

**Treynor ratio** (systematic risk)

$$T_p = \frac{E[R_p] - R_f}{\beta_p}$$

**Trap:** Sharpe divides by **σ**, Treynor by **β**. Entire/undiversified portfolio → Sharpe; diversified component → Treynor.

**Jensen's alpha**

$$\alpha_p = E[R_p] - \left[R_f + \beta_p\left(E[R_m]-R_f\right)\right]$$

A percentage, not a ratio — only compares funds of similar beta.

**Tracking error**

$$TE = \sigma\!\left(R_p - R_b\right)$$

$$R_b$$ = benchmark return. (Volatility of *active* returns, not the average difference.)

**Information ratio**

$$IR = \frac{E[R_p] - E[R_b]}{TE}$$

**Sortino ratio**

$$\text{Sortino} = \frac{E[R_p] - R_{min}}{\sigma_{down}}, \qquad
\sigma_{down} = \sqrt{\frac{1}{N}\sum_{R_t < R_{min}}\left(R_t - R_{min}\right)^2}$$

$$R_{min}$$ = minimum acceptable return (often $$R_f$$ or 0); only below-target deviations enter $$\sigma_{down}$$.

**RAROC**

$$RAROC = \frac{\text{revenues} - \text{costs} - \text{expected losses} - \text{taxes} + \text{return on economic capital} \pm \text{transfer prices}}{\text{economic capital}}$$

Economic capital = buffer for **unexpected** loss at the target confidence level; it earns roughly $$R_f$$, added back in the numerator. Accept if RAROC > hurdle rate (the firm's weighted cost of equity capital).

**Adjusted RAROC (ARAROC)**

$$ARAROC = RAROC - \beta_E\left(E[R_m] - R_f\right)$$

**Decision rule:** accept the project if $$ARAROC > R_f$$.

**Trap:** RAROC subtracts **expected** losses in the numerator but holds capital for **unexpected** losses in the denominator — don't double-count. And the ARAROC hurdle is the **risk-free rate**, not the market return.
