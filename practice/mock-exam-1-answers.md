---
title: "Mock Exam 1 — Answer Key"
parent: Practice
nav_order: 6
---

# Mock Exam 1 — Answer Key

Grade with the grid below first, then read the worked explanation for **every
question you missed or guessed**, and log each one in your error log.

## Answer grid

| | | | | | | | | | |
|---|---|---|---|---|---|---|---|---|---|
| 1. C | 2. C | 3. B | 4. C | 5. D | 6. C | 7. C | 8. B | 9. A | 10. B |
| 11. C | 12. C | 13. C | 14. A | 15. C | 16. B | 17. B | 18. A | 19. D | 20. B |
| 21. A | 22. B | 23. C | 24. D | 25. A | 26. A | 27. C | 28. D | 29. C | 30. B |
| 31. B | 32. C | 33. B | 34. C | 35. D | 36. B | 37. B | 38. C | 39. D | 40. C |
| 41. D | 42. C | 43. D | 44. C | 45. A | 46. C | 47. B | 48. A | 49. D | 50. C |
| 51. D | 52. B | 53. A | 54. A | 55. C | 56. B | 57. B | 58. C | 59. B | 60. C |
| 61. A | 62. A | 63. A | 64. D | 65. C | 66. D | 67. C | 68. B | 69. D | 70. C |
| 71. B | 72. B | 73. A | 74. D | 75. A | 76. B | 77. A | 78. C | 79. B | 80. B |
| 81. C | 82. D | 83. C | 84. D | 85. B | 86. A | 87. D | 88. A | 89. A | 90. B |
| 91. A | 92. D | 93. D | 94. A | 95. D | 96. C | 97. A | 98. B | 99. D | 100. A |

## Worked explanations

**Q1 — Book 3, Forward pricing** — **C.** No income, so
$$F_0 = S_0 e^{rT} = 50\,e^{0.04 \times 0.5} = 50\,e^{0.02} = \$51.01$$.
Choice A ($49.01) is the sign-flip error — discounting instead of
compounding; D uses a full year instead of six months.
[[DIAGRAM]]{"type":"steps","title":"No-income forward price","steps":["Start with spot S0 = 50","Grow at risk-free rate over T: e^(rT)","F0 = 50 e^(0.04×0.5) = 51.01"]}[[/DIAGRAM]]

**Q2 — Book 1, CAPM** — **C.**
$$E(R) = 3\% + 1.2\,(9\% - 3\%) = 3\% + 7.2\% = 10.2\%$$.
Choice D (13.8%) multiplies beta by the whole market return instead of the
excess return.
[[DIAGRAM]]{"type":"steps","title":"CAPM expected return","steps":["Risk-free rate: 3%","Add beta × market risk premium","1.2 × (9% − 3%) = 7.2%","E(R) = 3% + 7.2% = 10.2%"]}[[/DIAGRAM]]

**Q3 — Book 2, Moments of a distribution** — **B.** Mean
$$= 0.2(-10) + 0.5(5) + 0.3(20) = 6.5\%$$. Second moment
$$E[R^2] = 0.2(100) + 0.5(25) + 0.3(400) = 152.5$$, so variance
$$= 152.5 - 6.5^2 = 110.25$$ and $$\sigma = \sqrt{110.25} = 10.5\%$$.
Choice C ($$\sqrt{152.5} = 12.35$$) forgets to subtract the squared mean;
A is the mean itself.
[[DIAGRAM]]{"type":"steps","title":"Variance from moments","steps":["Mean μ = Σ p·R = 6.5%","E[R²] = Σ p·R² = 152.5","Variance = E[R²] − μ² = 110.25","σ = √110.25 = 10.5%"]}[[/DIAGRAM]]

**Q4 — Book 4, Parametric VaR** — **C.**
$$\text{VaR} = 2.326 \times 0.015 \times \$10{,}000{,}000 = \$348{,}900$$.
Choice A uses the 95% z-value 1.645; B uses the two-tailed 1.96 — both
classic wrong-z errors. D is the ten-day number ($$\times\sqrt{10}$$).
[[DIAGRAM]]{"type":"compare","title":"One-tailed VaR z-values","cols":[{"h":"Confidence","items":["95%","97.5%","99%"]},{"h":"z (one-tail)","items":["1.645","1.960","2.326"]}]}[[/DIAGRAM]]

**Q5 — Book 3, Futures margin** — **D.** Equity starts at $4,000 per
contract; a call comes when it falls below the $3,000 maintenance level,
i.e., after a loss of more than $1,000 per contract. Per bushel:
$$1{,}000 / 5{,}000 = \$0.20$$, so the trigger is $$8.00 - 0.20 = \$7.80$$.
Choice A ($7.20) wrongly lets equity fall all the way to zero. The two
contracts scale both the loss and the margin, so they cancel.
[[DIAGRAM]]{"type":"scale","title":"Margin account ($ per contract)","items":["0","|3,000 maintenance","4,000 initial"],"left":"margin call","right":"safe"}[[/DIAGRAM]]

**Q6 — Book 4, Duration and convexity** — **C.**
$$\frac{\Delta P}{P} \approx -6.5(0.01) + \tfrac{1}{2}(45)(0.01)^2 = -0.0650 + 0.00225 = -6.28\%$$.
Choice B is duration-only; A (−6.73%) flips the sign of the convexity
term — convexity always *cushions* the loss for a long bond.
[[DIAGRAM]]{"type":"steps","title":"Duration + convexity","steps":["Duration term: −D·Δy = −6.5(0.01) = −6.50%","Convexity term: +½·C·Δy² = +0.225%","Convexity always adds (cushions)","Total ΔP/P ≈ −6.28%"]}[[/DIAGRAM]]

**Q7 — Book 2, Bayes' theorem** — **C.**
$$P(S \mid B) = \frac{0.10 \times 0.70}{0.10 \times 0.70 + 0.90 \times 0.50} = \frac{0.07}{0.52} = 13.5\%$$.
Choice B (10%) ignores the evidence (the prior); D confuses
$$P(B \mid S)$$ with $$P(S \mid B)$$ — the inverse-probability error.
[[DIAGRAM]]{"type":"steps","title":"Bayes update","steps":["Prior P(S) = 10%","Likelihood of signal given S vs not-S","Posterior = joint / total evidence","P(S|B) = 0.07 / 0.52 = 13.5%"]}[[/DIAGRAM]]

**Q8 — Book 3, Put-call parity** — **B.**
$$p = c - S_0 + K e^{-rT} = 4.50 - 50 + 50\,e^{-0.02} = 4.50 - 50 + 49.01 = \$3.51$$.
Choice D ($5.49) adds rather than subtracts the $0.99 financing term —
a sign flip; A is the financing term alone.
[[DIAGRAM]]{"type":"steps","title":"Put-call parity for p","steps":["p = c − S0 + K·e^(−rT)","= 4.50 − 50 + 49.01","Financing term K·e^(−rT) is subtracted from S0","p = 3.51"]}[[/DIAGRAM]]

**Q9 — Book 1, Case studies (Barings)** — **A.** Nick Leeson both traded
and controlled settlement/back-office records, so losses on unauthorized
futures and options positions could be hidden in error account 88888.
The lesson is segregation of duties, not model risk (B).
[[DIAGRAM]]{"type":"highlight","title":"Barings: key failure","options":["Model risk in pricing","No segregation: trader controlled back office","Sovereign default exposure","Excessive regulatory capital"],"correct":1,"why":"Leeson ran both trading and settlement, hiding losses in account 88888."}[[/DIAGRAM]]

**Q10 — Book 4, Binomial trees** — **B.** With $$u = 1.1$$, $$d = 0.9$$:
$$p = \frac{e^{0.04 \times 0.25} - 0.9}{1.1 - 0.9} = \frac{1.01005 - 0.9}{0.2} = 0.5503$$
$$c = e^{-0.01}\,[0.5503 \times 10 + 0.4497 \times 0] = \$5.45$$
Choice C ($5.50) forgets to discount — the one-step-early error; A uses
the "real-world" $$p = 0.5$$.
[[DIAGRAM]]{"type":"steps","title":"One-step binomial call","steps":["Compute risk-neutral p = (e^(rΔt)−d)/(u−d)","p = 0.5503","Expected payoff = p·cu + (1−p)·cd","Discount at e^(−rΔt): c = 5.45"]}[[/DIAGRAM]]

**Q11 — Book 2, AR(1) processes** — **C.** Long-run mean
$$= \delta/(1 - \phi) = 2.0/(1 - 0.6) = 5.0$$. Choice B (3.33) divides by
$$\phi$$ instead of $$1 - \phi$$.
[[DIAGRAM]]{"type":"tree","title":"AR(1) long-run mean","root":"μ = δ / (1 − φ)","children":["δ = 2.0 (intercept)","φ = 0.6 (persistence)","μ = 2.0 / 0.4 = 5.0"]}[[/DIAGRAM]]

**Q12 — Book 3, Covered interest parity** — **C.**
$$F_0 = S_0 e^{(r_{USD} - r_{EUR})T} = 1.1000\,e^{(0.05 - 0.03)(1)} = 1.1000\,e^{0.02} = 1.1222$$.
The currency with the higher interest rate (USD) depreciates forward,
so the USD-per-EUR forward rate rises above spot. Choice A (1.0782)
flips the sign of the rate differential.
[[DIAGRAM]]{"type":"compare","title":"Covered interest parity","cols":[{"h":"Higher-rate ccy (USD)","items":["r = 5%","Depreciates forward","Trades at fwd discount"]},{"h":"Lower-rate ccy (EUR)","items":["r = 3%","Appreciates forward","Trades at fwd premium"]}]}[[/DIAGRAM]]

**Q13 — Book 4, Bond pricing** — **C.** Four semiannual periods, $3
coupon, 2.5% per period:
$$P = 3 \times \frac{1 - 1.025^{-4}}{0.025} + \frac{100}{1.025^{4}} = 11.29 + 90.60 = \$101.88$$
The bond trades above par because the 6% coupon exceeds the 5% yield —
a quick sanity check that eliminates A immediately.
[[DIAGRAM]]{"type":"scale","title":"Coupon vs yield → price","items":["yield > coupon (discount)","|coupon = yield (par)","coupon > yield (premium)"],"left":"below par","right":"above par"}[[/DIAGRAM]]

**Q14 — Book 1, Sharpe ratio** — **A.**
$$\text{Sharpe} = (11\% - 3\%)/16\% = 0.50$$. Choice B (0.69) forgets to
subtract the risk-free rate.
[[DIAGRAM]]{"type":"steps","title":"Sharpe ratio","steps":["Excess return = 11% − 3% = 8%","Divide by total volatility σ = 16%","Sharpe = 8 / 16 = 0.50"]}[[/DIAGRAM]]

**Q15 — Book 3, SOFR futures** — **C.** The quote fell
$$95.50 - 95.26 = 24$$ basis points; a long position loses when the quote
falls: $$24 \times \$25 = \$600$$ lost. Choice A flips the sign (rates
rose, so the long *loses*); D treats the move as 96 ticks.
[[DIAGRAM]]{"type":"compare","title":"SOFR futures (price = 100 − rate)","cols":[{"h":"Quote falls","items":["Rates rise","Long position loses","Here: −24 bp × $25 = −$600"]},{"h":"Quote rises","items":["Rates fall","Long position gains"]}]}[[/DIAGRAM]]

**Q16 — Book 2, Volatility estimation (EWMA)** — **B.**
$$\sigma_n^2 = 0.94(0.015)^2 + 0.06(0.020)^2 = 0.0002115 + 0.0000240 = 0.0002355$$
$$\sigma_n = \sqrt{0.0002355} = 1.53\%$$
Choice D (1.97%) averages the volatilities instead of the variances —
always update in variance space.
[[DIAGRAM]]{"type":"steps","title":"EWMA variance update","steps":["Work in variance, not volatility","σ²ₙ = λ·σ²ₙ₋₁ + (1−λ)·u²ₙ₋₁","= 0.94(0.015²) + 0.06(0.020²)","σₙ = √0.0002355 = 1.53%"]}[[/DIAGRAM]]

**Q17 — Book 4, Expected loss** — **B.**
$$EL = EAD \times PD \times LGD = 5{,}000{,}000 \times 0.02 \times (1 - 0.40) = \$60{,}000$$.
Choice A ($40,000) multiplies by the recovery rate instead of the loss
given default — the classic recovery/LGD swap.
[[DIAGRAM]]{"type":"steps","title":"Expected loss","steps":["EL = EAD × PD × LGD","LGD = 1 − recovery = 1 − 0.40 = 0.60","= 5,000,000 × 0.02 × 0.60","EL = 60,000"]}[[/DIAGRAM]]

**Q18 — Book 3, Minimum-variance hedge ratio** — **A.**
$$h^* = \rho\,\frac{\sigma_S}{\sigma_F} = 0.8 \times \frac{0.0263}{0.0313} = 0.6722$$
$$N = \frac{0.6722 \times 2{,}000{,}000}{42{,}000} = 32.0 \text{ contracts}$$
Choice D (48) hedges gallon-for-gallon, ignoring the hedge ratio.
[[DIAGRAM]]{"type":"steps","title":"Minimum-variance hedge","steps":["h* = ρ·(σS/σF) = 0.6722","Scale by exposure / contract size","N = h*·2,000,000 / 42,000","N ≈ 32 contracts"]}[[/DIAGRAM]]

**Q19 — Book 1, Enterprise risk management** — **D.** ERM's defining
benefit is the integrated, top-of-the-house view that captures
cross-risk interactions and diversification. It does not guarantee
losses stay within appetite (A) or replace specialist functions (B).

**Q20 — Book 4, Historical simulation VaR** — **B.** At 99% with 500
scenarios, $$1\% \times 500 = 5$$, so VaR is the **5th-worst** loss
(Hull/GARP convention): $3.1 million. Choice C ($3.3 million, the
4th-worst) is the one-step-early error; D is the worst loss.

**Q21 — Book 3, Option spreads** — **A.** This is a bull call spread
costing $$5 - 2 = \$3$$. Maximum payoff is the strike gap
$$55 - 50 = \$5$$, so maximum profit is $$5 - 3 = \$2$$. Choice B is the
cost, C the gap; D ignores the short call cap.

**Q22 — Book 2, Binomial distribution** — **B.**
$$P(X = 2) = \binom{10}{2}(0.1)^2(0.9)^8 = 45 \times 0.01 \times 0.4305 = 19.4\%$$
Choice A omits the $$\binom{10}{2} = 45$$ combinations factor.

**Q23 — Book 4, DV01** — **C.**
$$DV01 = D \times P \times 0.0001 = 5.2 \times 25{,}000{,}000 \times 0.0001 = \$13{,}000$$.
A and D are factor-of-ten slips (using 0.00001 or 0.001).

**Q24 — Book 1, Case studies (LTCM)** — **D.** LTCM's leveraged
convergence trades unwound when the 1998 Russia crisis drove correlated
spread widening; margin calls forced liquidation into falling markets —
the textbook funding-liquidity spiral. A is Barings; B is the 2007
crisis.

**Q25 — Book 3, Swaps and comparative advantage** — **A.** Fixed-rate
spread $$= 6.4\% - 5.0\% = 1.4\%$$; floating spread
$$= 1.0\% - 0.5\% = 0.5\%$$. Total gain
$$= 1.4\% - 0.5\% = 0.9\%$$. Choice B is the fixed spread alone, D the
floating spread alone.

**Q26 — Book 2, Hypothesis testing errors** — **A.** Cutting
$$\alpha$$ from 5% to 1% directly lowers the Type I error rate, but with
a fixed sample the rejection region shrinks, so the Type II error rate
rises (and power falls — D states the opposite).

**Q27 — Book 4, Black-Scholes-Merton** — **C.**
$$c = S_0 N(d_1) - K e^{-rT} N(d_2) = 50(0.5977) - 50\,e^{-0.025}(0.5422)$$
$$= 29.885 - 48.766 \times 0.5422 = 29.885 - 26.441 = \$3.44$$
Choice B ($2.78) forgets to discount the strike — the wrong-compounding
error $$50(0.5977 - 0.5422)$$.

**Q28 — Book 3, Backwardation and convenience yield** — **D.** With
continuous costs, $$F_0 = S_0 e^{(r + u - y)T}$$. Futures below spot
requires $$y > r + u$$ — a convenience yield large enough to outweigh
financing and storage. A and C imply contango.

**Q29 — Book 1, Beta** — **C.**
$$\beta = \frac{\text{Cov}(R_i, R_m)}{\sigma_m^2} = \frac{0.0288}{0.0256} = 1.125$$.
Choice A (0.889) inverts the ratio.

**Q30 — Book 2, Annualizing volatility** — **B.**
$$\sigma_{ann} = 1.2\% \times \sqrt{252} = 1.2\% \times 15.87 = 19.05\%$$.
Choice D multiplies by 252 (the variance scaling applied to volatility);
A divides by the square root.

**Q31 — Book 3, Forward price with known income** — **B.** Strip the
dividend's present value, then compound:
$$F_0 = \left(60 - 2\,e^{-0.05 \times 0.25}\right) e^{0.05 \times 0.5} = (60 - 1.975)\,(1.02532) = \$59.49$$
Choice C ($61.52) forgets the dividend entirely; A stops one step early
(no compounding).

**Q32 — Book 2, R-squared** — **C.** In a single-variable regression,
$$R^2$$ is the explained share of variance (36%) and equals the squared
correlation, so $$\rho = \sqrt{0.36} = 0.60$$. B confuses explained with
unexplained variation.

**Q33 — Book 4, Delta hedging** — **B.** Short calls on 2,000 shares
have delta $$-0.60 \times 2{,}000 = -1{,}200$$; neutralize by **buying**
1,200 shares. Choice A is the sign flip; D divides by delta instead of
multiplying.

**Q34 — Book 1, Security market line** — **C.** CAPM-required return
$$= 3\% + 0.8(10\% - 3\%) = 8.6\%$$. The 9.0% forecast exceeds it, so
the stock offers excess return: it is undervalued and plots **above**
the SML. (Above the line always means undervalued — pairing "above"
with "overvalued" is the classic trap in A.)

**Q35 — Book 3, American options** — **D.** Without dividends, early
exercise of an American call is never optimal (you would forfeit time
value and the interest on the strike), so it is worth the *same* as the
European call — which is why C is wrong. Early exercise of a deep
in-the-money American put can be optimal.

**Q36 — Book 2, Normal probability** — **B.**
$$P(R < 0) = P\!\left(Z < \frac{0 - 8}{12}\right) = P(Z < -0.67) = 1 - 0.7486 = 25.1\%$$
Choice D (74.9%) is the complement error — forgetting to take
$$1 - N(0.67)$$.

**Q37 — Book 4, Expected shortfall** — **B.** Worst 5% of 100 scenarios
= worst 5 losses:
$$ES = \frac{6.0 + 5.2 + 4.8 + 4.5 + 4.0}{5} = \frac{24.5}{5} = \$4.90 \text{ million}$$
Choice A is the 95% VaR (the cutoff loss), not the tail average.

**Q38 — Book 3, Swap valuation** — **C.** Value the swap as bonds. The
floating leg just reset, so $$B_{fl} = 100$$. Fixed leg:
$$B_{fix} = \frac{5}{1.06} + \frac{105}{1.06^2} = 4.717 + 93.450 = 98.167$$
$$V_{payer} = B_{fl} - B_{fix} = 100 - 98.167 = +\$1.83 \text{ million}$$
Paying 5% when market rates are 6% is valuable. Choice A is the
receiver's value — a sign flip.

**Q39 — Book 1, GARP Code of Conduct** — **D.** Candidates may state
facts ("passed FRM Part I") but may not use the FRM designation or any
variant of it until certified. There is no "partial" designation (B).

**Q40 — Book 4, Bootstrapping discount factors** — **C.**
$$101 = 5(0.95) + 105\,d_{1.0} \;\Rightarrow\; d_{1.0} = \frac{101 - 4.75}{105} = \frac{96.25}{105} = 0.9167$$
Choice D (0.9625) divides by 100 (face) instead of 105 — forgetting the
final coupon rides with the principal.

**Q41 — Book 2, Hypothesis testing** — **D.**
$$t = \frac{5.2 - 4.0}{4/\sqrt{64}} = \frac{1.2}{0.5} = 2.4$$
Since $$1.96 < 2.4 < 2.576$$: reject at 5%, fail to reject at 1%.
Watch the standard-error step — dividing by $$\sigma$$ instead of
$$\sigma/\sqrt{n}$$ gives "fail to reject" everywhere (B).

**Q42 — Book 3, Hedging with index futures** — **C.**
$$N = \beta \times \frac{V_P}{F \times m} = 1.2 \times \frac{20{,}000{,}000}{5{,}000 \times 250} = 1.2 \times 16 = 19.2 \approx 19$$
Choice B (16) drops the beta adjustment.

**Q43 — Book 4, Ratings transition matrices** — **D.** Default in year
1: 2%. Default in year 2: from A (prob 0.90) default 2% → 1.80%; from
BBB (prob 0.08) default 4% → 0.32%. Cumulative:
$$2.00\% + 1.80\% + 0.32\% = 4.12\%$$
Choice C (4.00% = 2% + 2%) ignores migration — the one-step-early
error of squaring the matrix without the BBB path.

**Q44 — Book 1, Jensen's alpha** — **C.**
$$\alpha = 12\% - \left[2\% + 0.9\,(10\% - 2\%)\right] = 12\% - 9.2\% = 2.8\%$$.
Choice B (2.0%) is the raw excess over the market, ignoring beta.

**Q45 — Book 3, Straddles** — **A.** Total premium $$= 6 + 4 = \$10$$,
so break-evens are $$100 \pm 10$$: $90 and $110. Choices B and D use
only one leg's premium on each side — both legs' costs must be
recovered in *each* direction.

**Q46 — Book 4, GARCH(1,1)** — **C.**
$$\sigma_n^2 = 0.000002 + 0.08(0.02)^2 + 0.90(0.012)^2 = 0.000002 + 0.000032 + 0.0001296 = 0.0001636$$
$$\sigma_n = \sqrt{0.0001636} = 1.28\%$$
Choice D (1.93%) mixes volatilities instead of variances.

**Q47 — Book 4, Modified duration** — **B.**
$$D_{mod} = \frac{D_{Mac}}{1 + y/m} = \frac{7.5}{1 + 0.06/2} = \frac{7.5}{1.03} = 7.28$$
Choice A (7.08) divides by 1.06 — the wrong-compounding error (annual
instead of semiannual).

**Q48 — Book 3, Compounding conventions** — **A.**
$$r_c = m \ln\!\left(1 + \frac{r_m}{m}\right) = 2 \ln(1.04) = 7.84\%$$
The continuous rate is always *below* the equivalent discrete rate —
choice C (8.16%) converts in the wrong direction.

**Q49 — Book 1, Case studies (Metallgesellschaft)** — **D.** The
stack-and-roll hedge was arguably sound at maturity, but daily
mark-to-market losses on the futures demanded cash *now* while the
offsetting gains on customer contracts were unrealized — funding
liquidity risk. A is false (rolling *creates* basis risk).

**Q50 — Book 4, VaR aggregation** — **C.** With jointly normal returns
VaR scales like volatility:
Working in $ thousands:
$$\text{VaR}_P = \sqrt{300^2 + 400^2 + 2(0.5)(300)(400)} = \sqrt{370{,}000} \approx 608.3$$
i.e., $608,300. Choice D ($700,000) is the undiversified sum
($$\rho = 1$$); A assumes $$\rho = 0$$.

**Q51 — Book 3, Insurance ratios** — **D.** Combined ratio
$$= 75\% + 30\% = 105\% > 100\%$$: an underwriting loss. But insurers
invest premiums, so investment income can still produce an overall
profit — which is why C overreaches.

**Q52 — Book 2, Confidence intervals** — **B.** Known
$$\sigma$$, so use z:
$$6\% \pm 1.96 \times \frac{10\%}{\sqrt{25}} = 6\% \pm 3.92\% = [2.08\%,\ 9.92\%]$$
Choice C uses $$z = 1.645$$ (a 90% interval); A uses 2.576 (99%) —
wrong-z errors either way.

**Q53 — Book 4, Coherent risk measures** — **A.** VaR can violate
subadditivity: the VaR of a combined portfolio can exceed the sum of the
parts, penalizing diversification. ES satisfies all four coherence
axioms.

**Q54 — Book 1, Risk appetite vs. capacity** — **A.** Appetite is what
the firm is *willing* to take; capacity is what it is *able* to absorb
(capital, liquidity, systems). A well-run firm sets appetite at or below
capacity — the reverse of C.

**Q55 — Book 3, Option price bounds** — **C.**
$$c \geq S_0 - K e^{-rT} = 52 - 50\,e^{-0.025} = 52 - 48.77 = \$3.23$$
Choice B ($2.00) uses the undiscounted strike — i.e., bare intrinsic
value, the classic forgotten-discounting error.

**Q56 — Book 2, Poisson distribution** — **B.**
$$P(X = 0) = e^{-\lambda} = e^{-2} = 13.5\%$$.
Choice C (27.1%) is $$P(X = 1) = 2e^{-2}$$ — one step off.

**Q57 — Book 4, VaR time scaling** — **B.**
$$\text{VaR}_{10} = 150{,}000 \times \sqrt{10} = \$474{,}300$$.
Choice D multiplies by 10 — scaling VaR like variance instead of like
volatility.

**Q58 — Book 3, Forward rates** — **C.** With continuous compounding:
$$f_{1,2} = \frac{r_2 T_2 - r_1 T_1}{T_2 - T_1} = \frac{0.05(2) - 0.04(1)}{1} = 6\%$$
Choice A (4.5%) averages the two zero rates — the forward must sit
*above* both when the curve is rising.

**Q59 — Book 1, Sortino ratio** — **B.**
$$\text{Sortino} = \frac{R - MAR}{\text{downside deviation}} = \frac{10\% - 4\%}{8\%} = 0.75$$
Choice A (0.50) divides by total volatility — that is the Sharpe-style
error the Sortino ratio exists to avoid.

**Q60 — Book 4, Operational risk** — **C.** With independent frequency
and severity, expected annual loss
$$= \lambda \times E[\text{severity}] = 4 \times \$50{,}000 = \$200{,}000$$.

**Q61 — Book 3, Cheapest-to-deliver** — **A.** Delivery cost = quoted
price − futures × CF.
Bond X: $$98.50 - 96.00 \times 1.02 = 98.50 - 97.92 = 0.58$$.
Bond Y: $$121.80 - 96.00 \times 1.26 = 121.80 - 120.96 = 0.84$$.
X is cheapest. Choice B compares raw quoted prices — the conversion
factor exists precisely to make that comparison invalid.

**Q62 — Book 2, Regression inference** — **A.**
$$t = 0.85/0.34 = 2.5$$; since $$1.96 < 2.5 < 2.576$$, significant at 5%
but not at 1%. Significance needs only the coefficient and its standard
error, not $$R^2$$ (D).

**Q63 — Book 4, Key rate durations** — **A.** A parallel shift moves
every key rate by the same amount, so the key rate durations sum
(approximately) to the effective duration. B describes a parallel-shift
measure, not key rates; a zero-coupon bond's exposure is concentrated at
its own maturity (so D is wrong).

**Q64 — Book 1, CML vs. SML** — **D.** The CML prices only efficient
(fully diversified) portfolios and uses total risk $$\sigma$$; the SML
prices *any* asset using beta, because only systematic risk is rewarded.
A swaps the two.

**Q65 — Book 3, Mortgage prepayments** — **C.**
$$SMM = 1 - (1 - CPR)^{1/12} = 1 - 0.94^{1/12} = 0.514\%$$
Choice B (0.500%) is the simple-division error $$6\%/12$$ — the
relationship is geometric, not linear.

**Q66 — Book 2, Stationarity** — **D.** An AR(1) is covariance
stationary iff $$\lvert\phi\rvert < 1$$. With $$\phi = 1$$ (B) the
process is a random walk — the unit-root case.

**Q67 — Book 4, Credit spreads and PD** — **C.** Spread
$$\approx PD \times LGD$$, so
$$PD = \frac{0.02}{1 - 0.40} = \frac{0.02}{0.60} = 3.33\%$$
Choice A (1.20%) multiplies by LGD instead of dividing; D divides by the
recovery rate instead of LGD.

**Q68 — Book 3, Valuing a forward position** — **B.**
$$V = (F_0 - K)\,e^{-rT} = (53 - 50)\,e^{-0.04 \times 0.5} = 3\,e^{-0.02} = \$2.94$$
Choice C ($3.00) skips the discounting; D ($3.06) compounds instead —
a sign flip in the exponent.

**Q69 — Book 1, Rationales for corporate hedging** — **D.** Shareholders
*can* diversify firm-specific risk cheaply on their own, so D is not a
valid rationale — that is exactly the Modigliani-Miller objection.
Distress costs (A), convex taxes (B), and protecting investment plans
(C) are the standard valid reasons.

**Q70 — Book 4, Delta-gamma approximation** — **C.**
$$\Delta c \approx \Delta \cdot \Delta S + \tfrac{1}{2}\Gamma (\Delta S)^2 = 0.60(2) + \tfrac{1}{2}(0.05)(4) = 1.20 + 0.10 = \$1.30$$
Choice B is delta-only; D ($1.40) forgets the $$\tfrac{1}{2}$$ on the
gamma term.

**Q71 — Book 3, Hedge fund fees** — **B.** Management fee 2% leaves 16%;
incentive fee $$0.20 \times 16\% = 3.2\%$$. Net
$$= 16\% - 3.2\% = 12.8\%$$. Choice A (12.4%) charges the incentive fee
on the gross 18% — read whether the incentive applies net of the
management fee.

**Q72 — Book 2, Correlation** — **B.**
$$\rho = \frac{0.0018}{0.05 \times 0.06} = \frac{0.0018}{0.0030} = 0.60$$.
Choice D (1.67) inverts the ratio — impossible, since
$$\lvert\rho\rvert \le 1$$.

**Q73 — Book 4, Reverse stress testing** — **A.** Reverse stress tests
start from the outcome (e.g., insolvency) and search backward for the
scenarios that produce it, uncovering vulnerabilities conventional
forward-looking scenarios may miss.

**Q74 — Book 1, The 2007–2009 crisis** — **D.** Under
originate-to-distribute, credit risk left the originator's balance
sheet, gutting incentives to screen and monitor borrowers — the moral
hazard at the heart of the subprime collapse. A states the opposite.

**Q75 — Book 3, Barrier options** — **A.** In-out parity: for the same
barrier, strike, and expiry, knock-in + knock-out = vanilla, because
exactly one of the two pays off along any path.

**Q76 — Book 2, Monte Carlo standard error** — **B.** The standard
error scales as $$1/\sqrt{n}$$, so halving it requires
$$4\times$$ the trials. Choice A treats the error as $$1/n$$.

**Q77 — Book 4, Gamma** — **A.** A delta-neutral, long-gamma position
gains from large moves in either direction (the P&L is locally
$$\tfrac{1}{2}\Gamma (\Delta S)^2 > 0$$), at the cost of theta decay if
the underlying sits still. D has the volatility comparison backward.

**Q78 — Book 3, Cost of carry (gold)** — **C.** Storage costs *add* to
the carry:
$$F_0 = S_0 e^{(r + u)T} = 2{,}400\,e^{(0.05 + 0.005)(1)} = 2{,}400\,e^{0.055} = \$2{,}535.70$$
Choice A ($2,510.47) subtracts storage costs — a sign flip; B ignores
them.

**Q79 — Book 1, Information ratio** — **B.**
$$IR = \frac{\text{active return}}{\text{tracking error}} = \frac{2\%}{4\%} = 0.50$$.

**Q80 — Book 3, DV01-based hedging** — **B.**
$$N = \frac{DV01_P}{DV01_F} = \frac{9{,}000}{75} = 120 \text{ contracts short}$$.
A and C are factor-of-ten slips.

**Q81 — Book 3, Futures invoice price** — **C.**
$$\text{Invoice} = F \times CF + AI = 95.00 \times 1.10 + 1.20 = 104.50 + 1.20 = \$105.70$$
Choice B ($104.50) forgets accrued interest; A divides by the conversion
factor instead of multiplying.

**Q82 — Book 2, Bootstrap simulation** — **D.** The bootstrap resamples
the observed data with replacement, so no parametric distribution (or
covariance matrix) need be specified — A and B describe parametric
Monte Carlo. Its limitation is the mirror of C: it cannot generate
outcomes outside the historical sample.

**Q83 — Book 4, Theta** — **C.** Long options almost always bleed value
as time passes (theta < 0), and the decay accelerates for at-the-money
options near expiry. For long options theta and gamma have *opposite*
signs (D), which is the gamma-theta trade-off.

**Q84 — Book 1, Treynor ratio** — **D.** Treynor divides excess return
by beta, so it is the right measure when the portfolio is a small slice
of a diversified whole and idiosyncratic risk washes out. For total
wealth (A) use Sharpe.

**Q85 — Book 4, Credit ratings** — **B.** Investment grade extends down
to BBB− (Moody's Baa3); BB+ (Ba1) is the top *speculative* grade.

**Q86 — Book 2, LASSO vs. ridge** — **A.** The LASSO's L1 penalty can
set coefficients exactly to zero, performing variable selection; ridge's
L2 penalty (described by C) only shrinks them toward zero.

**Q87 — Book 4, Stress scenario design** — **D.** Scenarios must be
severe but plausible, with coherent joint movements across risk factors.
Single-factor shocks (C) are sensitivity tests, not scenarios.

**Q88 — Book 1, Risk governance** — **A.** The CRO needs independence:
direct access to the CEO/board risk committee and pay decoupled from the
P&L of the desks being policed. B and C recreate the conflicts that
sank Barings-style controls.

**Q89 — Book 3, Currency swaps** — **A.** Because the legs are in
different currencies, principals are exchanged at initiation and
re-exchanged at maturity — unlike an interest rate swap, where notional
is never exchanged. This makes counterparty exposure larger, not zero
(D).

**Q90 — Book 2, Independence** — **B.**
$$P(A)P(B) = 0.4 \times 0.5 = 0.20 = P(A \cap B)$$, equivalently
$$P(A \mid B) = 0.2/0.5 = 0.4 = P(A)$$: independent. Choice C confuses
dependence with overlap; mutually exclusive (A) would require
$$P(A \cap B) = 0$$.

**Q91 — Book 4, Spot, forward, and par rates** — **A.** With an
upward-sloping spot curve, forwards sit above spots (they are the
marginal rates pulling the average up), and par yields sit below spots
(early coupons are discounted at lower rates): forward > spot > par.

**Q92 — Book 1, APT** — **D.** APT rests on no-arbitrage in a
multifactor return model; it needs neither the market portfolio nor the
strong investor assumptions of the CAPM (A, C), and it allows many
factors (B).

**Q93 — Book 3, Central clearing** — **D.** Novation substitutes the CCP
into each trade, and multilateral netting compresses bilateral
exposures — but credit risk is transformed and concentrated in the CCP,
not eliminated (A). Initial margin is required, not removed (C).

**Q94 — Book 2, Kurtosis** — **A.** Kurtosis of 4.8 > 3 means excess
kurtosis of 1.8: fatter tails than the normal, so extreme outcomes are
more likely. Kurtosis says nothing about skew (C).

**Q95 — Book 4, Sovereign risk** — **D.** A government can tax and print
its own currency but must *earn* foreign currency, so foreign-currency
ratings are typically at or below local-currency ratings.

**Q96 — Book 1, GARP Code of Conduct** — **C.** The Code requires full
and fair disclosure of actual or potential conflicts to affected
parties; it does not mandate automatic resignation (A) or reporting to
GARP (D).

**Q97 — Book 3, Trading book vs. banking book** — **A.** Trading book:
held to trade, marked to market daily. Banking book: loans and
held-to-maturity assets on accrual accounting. Both attract capital
(C), and regulators restrict reclassification precisely to prevent D.

**Q98 — Book 3, Dividends and option prices** — **B.** A larger dividend
lowers the expected ex-dividend stock price, which hurts calls and helps
puts. (Holders of *European* options are not protected against
dividend announcements.)

**Q99 — Book 4, EL vs. UL** — **D.** Expected loss is a predictable cost
covered by loan pricing and provisions; unexpected loss — the
volatility around EL — is what economic capital is held against.
Choice B reverses the pairing.

**Q100 — Book 4, Implied volatility** — **A.** Implied volatility is the
value of $$\sigma$$ that equates the BSM model price to the observed
market price — it is backed out of prices, not estimated from
historical returns (B) or a GARCH model (D).

## Scoring

Count your correct answers by book using the question lists below, then
fill in the grid.

| Book | Questions | Your score |
|---|---|---|
| Book 1 — Foundations of Risk Management | 2, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64, 69, 74, 79, 84, 88, 92, 96 | ____ / 20 |
| Book 2 — Quantitative Analysis | 3, 7, 11, 16, 22, 26, 30, 32, 36, 41, 52, 56, 62, 66, 72, 76, 82, 86, 90, 94 | ____ / 20 |
| Book 3 — Financial Markets and Products | 1, 5, 8, 12, 15, 18, 21, 25, 28, 31, 35, 38, 42, 45, 48, 51, 55, 58, 61, 65, 68, 71, 75, 78, 80, 81, 89, 93, 97, 98 | ____ / 30 |
| Book 4 — Valuation and Risk Models | 4, 6, 10, 13, 17, 20, 23, 27, 33, 37, 40, 43, 46, 47, 50, 53, 57, 60, 63, 67, 70, 73, 77, 83, 85, 87, 91, 95, 99, 100 | ____ / 30 |
| **Total** | | ____ / 100 |

**Interpretation:**

- **75%+ overall** — you are on track. Keep sitting timed question
  blocks and maintain your error log to protect against drift.
- **60–74%** — targeted re-study. Work through your error log
  question by question, re-read only the topics you missed, then re-test
  with fresh questions on those topics.
- **Below 60%** — re-study the two weakest books from the readings
  before attempting more mock questions; volume of practice will not fix
  gaps in the underlying material.
