---
title: "Book 4 Formulas"
parent: Formula Sheets
nav_order: 4
---

# Book 4 Formulas

Every testable formula in Valuation and Risk Models, with variable definitions, sign conventions, and the classic traps.

## Ch 1 — Measures of Financial Risk

Parametric (delta-normal) VaR at confidence level α, **loss convention** (VaR reported as a positive loss number):

$$\text{VaR}_\alpha = \mu - z_\alpha \sigma \;\;\text{(on returns; for losses } \text{VaR} = -\mu + z_\alpha\sigma\text{)}$$

where μ, σ = mean and standard deviation of P&L (or returns × portfolio value) and $$z_\alpha$$ = standard normal quantile (1.645 for 95%, 2.326 for 99%). *Trap:* with μ = 0 (standard for short horizons) VaR = $$z_\alpha\sigma$$ × value; state whether μ is included — GARP answer choices differ by exactly μ.

Expected shortfall (normal), average loss beyond VaR:

$$\text{ES} = \mu + \sigma\,\frac{\phi(z_\alpha)}{1-\alpha}$$

where ϕ = standard normal **density** (not the CDF), e.g., ϕ(1.645) = 0.1031, ϕ(2.326) = 0.0267. Sign convention: written this way, μ is the mean *loss*; if μ is a mean return, flip its sign. ES ≥ VaR always.

Coherent risk measure axioms: **monotonicity, translation invariance, positive homogeneity, subadditivity** — $$\rho(A+B) \le \rho(A) + \rho(B)$$. VaR violates subadditivity; ES satisfies all four.

## Ch 2 — Calculating and Applying VaR

Square-root-of-time scaling (i.i.d. returns, zero mean):

$$\text{VaR}_{T\text{ days}} = \text{VaR}_{1\text{ day}} \times \sqrt{T} \qquad \sigma_{T} = \sigma_{1}\sqrt{T}$$

*Trap:* invalid under autocorrelation (positive autocorrelation → understates) or mean reversion.

Historical simulation rank rule: with n scenarios, the α-confidence VaR is read from the **(1−α)·n worst** outcomes — e.g., 99% VaR with 500 scenarios is the 5th worst loss (some conventions: between 5th and 6th; follow the question's wording).

## Ch 3 — Measuring and Monitoring Volatility

EWMA (RiskMetrics λ = 0.94 daily):

$$\sigma_t^2 = \lambda\sigma_{t-1}^2 + (1-\lambda)r_{t-1}^2$$

Higher λ → smoother, slower-reacting. Weights on past squared returns decay as $$(1-\lambda)\lambda^i$$.

GARCH(1,1):

$$\sigma_t^2 = \omega + \alpha r_{t-1}^2 + \beta\sigma_{t-1}^2 \qquad V_L = \frac{\omega}{1-\alpha-\beta}$$

Stationarity requires α + β < 1; EWMA is GARCH with ω = 0, α + β = 1 (no mean reversion, no long-run variance). *Trap:* formulas update the **variance**; take the square root at the end, and don't mix % and decimal returns.

## Ch 6 — Measuring Credit Risk

$$\text{EL} = \text{PD} \times \text{LGD} \times \text{EAD}$$

PD = probability of default, LGD = loss given default = 1 − recovery rate, EAD = exposure at default. Unexpected loss (one-year, single exposure):

$$\text{UL} = \text{EAD} \times \sqrt{\text{PD}\cdot\sigma_{LGD}^2 + \text{LGD}^2\cdot\sigma_{PD}^2}, \qquad \sigma_{PD}^2 = \text{PD}(1-\text{PD})$$

*Trap:* LGD vs recovery — read which one is given. EL is priced into spreads; capital is held against UL.

## Ch 9 — Pricing Conventions, Discounting, and Arbitrage

Discount factor: $$d(t)$$ = price today of \$1 at t; $$P = \sum_t CF_t \, d(t)$$. Extract d(t) iteratively (bootstrapping) from coupon bond prices.

T-bill discount quote (US convention, ACT/360):

$$P = F\left[1 - \frac{n}{360}\,d\right] \qquad d = \frac{360}{n}\cdot\frac{F-P}{F}$$

d = quoted discount rate, n = days to maturity, F = face. *Trap:* the discount rate understates the true (investment) yield — it divides by F, not P, and uses a 360-day year.

Law of one price / arbitrage: identical cash flows ⇒ identical price; replicate a bond from other bonds with matching cash flows and compare.

## Ch 10 — Interest Rates

Compounding conversions (rate $$R_m$$ compounded m times/year ↔ continuous $$R_c$$):

$$R_c = m\ln\!\left(1+\frac{R_m}{m}\right) \qquad R_m = m\left(e^{R_c/m} - 1\right)$$

General frequency switch: $$\left(1+\frac{R_m}{m}\right)^m = \left(1+\frac{R_n}{n}\right)^n$$.

Forward rate from spots (semiannual convention; t in years):

$$\left(1+\frac{z_2}{2}\right)^{2t_2} = \left(1+\frac{z_1}{2}\right)^{2t_1}\left(1+\frac{f}{2}\right)^{2(t_2-t_1)}$$

Continuous version: $$f = \frac{z_2 t_2 - z_1 t_1}{t_2 - t_1}$$.

Par rate c solves $$\frac{c}{2}\sum_i d(t_i) \cdot 100 + 100\,d(T) = 100$$ — the coupon making the bond price par. Upward-sloping curve ⇒ forward > spot > par at each maturity. *Trap:* forwards "lever" spots — a flat segment of spots forces the forward to equal them; rising spots force forwards above.

## Ch 11 — Bond Yields and Return Calculations

Price from YTM (semiannual): $$P = \sum_{i=1}^{2T}\frac{cF/2}{(1+y/2)^i} + \frac{F}{(1+y/2)^{2T}}$$

Annuity: $$PV = \frac{C}{y}\left[1-(1+y)^{-n}\right]$$. Perpetuity: $$PV = C/y$$.

Gross realized return: $$R = \frac{P_{end} + \text{coupons} + \text{reinvestment income} - P_{start}}{P_{start}}$$; net subtracts financing.

Coupon > YTM ⇒ premium; < ⇒ discount; pull to par over time. *Trap:* realized return = YTM only if coupons are reinvested at the YTM and held to maturity; zeros are exempt (no coupons).

## Ch 12 — Duration, Convexity, DV01

$$\text{DV01} = -\frac{\Delta P}{10{,}000\cdot\Delta y} = \frac{D_{Mod}\cdot P}{10{,}000}$$

$$D_{Mod} = \frac{D_{Mac}}{1+y/m} \qquad D_{Eff} = \frac{P_- - P_+}{2P\,\Delta y} \qquad C_{Eff} = \frac{P_+ + P_- - 2P}{P(\Delta y)^2}$$

Dollar duration = $$D_{Mod} \cdot P$$. Price change estimate:

$$\Delta P \approx -D\cdot P\cdot\Delta y + \frac{1}{2}C\cdot P\cdot(\Delta y)^2$$

DV01 hedge: $$N = -\dfrac{\text{DV01}_{position}}{\text{DV01}_{hedge}}$$. Portfolio D and C = value-weighted averages; DV01s add.

Macaulay = cash-flow-time average (zero: $$D_{Mac}=T$$); modified for option-free yield moves; **effective** for callables/MBS. Barbell vs duration-matched bullet: barbell has more convexity, usually lower yield. *Trap:* Δy in decimal, keep the ½, and rescale convexity if quoted per 100.

## Ch 13 — Non-Parallel Shifts

$$\text{KR01}_k = -\frac{\Delta P_k}{10{,}000\,\Delta y_k} \qquad \frac{\Delta P}{P} \approx -\sum_k D_k\,\Delta y_k$$

$$\sum_k D_k \approx D_{Eff} \qquad \sum_k \text{KR01}_k \approx \text{DV01}$$

Key-rate shifts are tent-shaped (1bp at the key maturity, linear to zero at neighbors). Hedge n key rates with n bonds: set net KR01 = 0 at each key rate (n equations). Partial '01s shift curve-fitting instruments; forward-bucket '01s shift forward-rate segments; both sum to the total '01. Volatility-weighted hedge multiplies the DV01 ratio by regression beta of position yield on hedge yield. *Trap:* key-rate durations can be negative for individual bonds; positive KR01 = loss when that rate rises, so hedge with shorts.

## Ch 14 — Binomial Trees

$$\Delta = \frac{f_u - f_d}{S_0 u - S_0 d} \qquad p = \frac{e^{r\Delta t}-d}{u-d} \qquad f = e^{-r\Delta t}\left[p f_u + (1-p)f_d\right]$$

$$u = e^{\sigma\sqrt{\Delta t}} \qquad d = \frac{1}{u}$$

Numerator growth factor by underlying: stock $$e^{r\Delta t}$$; dividend yield q: $$e^{(r-q)\Delta t}$$; currency: $$e^{(r-r_f)\Delta t}$$; **futures: 1**. Discount always at domestic r. American: at each node take max(intrinsic, continuation). *Trap:* never value an American option by discounting terminal payoffs directly; and √Δt (not Δt) in u.

## Ch 15 — Black–Scholes–Merton

$$c = S_0 N(d_1) - Ke^{-rT}N(d_2) \qquad p = Ke^{-rT}N(-d_2) - S_0 N(-d_1)$$

$$d_1 = \frac{\ln(S_0/K) + (r+\sigma^2/2)T}{\sigma\sqrt{T}} \qquad d_2 = d_1 - \sigma\sqrt{T}$$

Continuous dividend yield q (indices; FX with q = $$r_f$$):

$$c = S_0 e^{-qT}N(d_1) - Ke^{-rT}N(d_2), \qquad d_1 = \frac{\ln(S_0/K) + (r - q + \sigma^2/2)T}{\sigma\sqrt{T}}$$

Discrete dividends: use $$S_0 - PV(\text{divs})$$. Put–call parity (no dividends):

$$c + Ke^{-rT} = p + S_0 \qquad \text{(yield q: } c + Ke^{-rT} = p + S_0e^{-qT}\text{)}$$

Lognormal returns: $$\ln S_T \sim N\big(\ln S_0 + (\mu - \sigma^2/2)T,\, \sigma^2 T\big)$$. Annualize realized vol: $$\hat\sigma = s\sqrt{252}$$ (daily). N(d₂) = risk-neutral exercise probability; N(d₁) = call delta. Warrant ≈ $$\frac{N}{N+M} \times c$$ (dilution). Black's approximation for American calls with dividends: max of (call to T on dividend-adjusted S₀, call expiring just before the last ex-date). *Trap:* d₁ uses **+σ²/2**; the −σ²/2 belongs to the lognormal mean. Always discount K.

## Ch 16 — The Greeks

With dividend yield q (set q = 0 for plain stock); $$N'(x) = \frac{1}{\sqrt{2\pi}}e^{-x^2/2}$$:

$$\delta_{call} = e^{-qT}N(d_1) \qquad \delta_{put} = e^{-qT}\left[N(d_1)-1\right]$$

$$\Gamma = \frac{N'(d_1)\,e^{-qT}}{S_0\sigma\sqrt{T}} \qquad \text{vega} = S_0\sqrt{T}\,N'(d_1)\,e^{-qT} \quad\text{(same for calls and puts)}$$

$$\Theta_{call} = -\frac{S_0 N'(d_1)\sigma e^{-qT}}{2\sqrt{T}} + qS_0N(d_1)e^{-qT} - rKe^{-rT}N(d_2)$$

$$\Theta_{put} = -\frac{S_0 N'(d_1)\sigma e^{-qT}}{2\sqrt{T}} - qS_0N(-d_1)e^{-qT} + rKe^{-rT}N(-d_2)$$

$$\rho_{call} = KTe^{-rT}N(d_2) \qquad \rho_{put} = -KTe^{-rT}N(-d_2)$$

Delta–gamma P&L: $$\Delta P \approx \delta\,\Delta S + \frac{1}{2}\Gamma(\Delta S)^2$$. Delta-neutral book identity:

$$\Theta + rS\delta + \frac{1}{2}\sigma^2S^2\Gamma = r\Pi \;\Rightarrow\; \text{(δ = 0): big +Θ pairs with big −Γ}$$

Hedging order: gamma (or vega) with traded options **first**, then delta with shares (shares have Γ = vega = 0). Gamma peaks ATM near expiry; vega peaks ATM at long maturity.

| Position | Delta | Gamma | Theta | Vega | Rho |
|---|---|---|---|---|---|
| Long call | + | + | − | + | + |
| Long put | − | + | − (usually) | + | − |
| Short call | − | − | + | − | − |
| Short put | + | − | + (usually) | − | + |

*Trap:* theta exceptions — deep ITM European puts (and ITM calls on high-q assets) can have **positive** theta. Short option positions flip every sign, including gamma and vega.
