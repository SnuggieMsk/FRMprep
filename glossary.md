---
title: Glossary
nav_order: 11
---

# Glossary

Terms as used in the FRM Part I curriculum.

## A

- **Accrued interest** — Coupon interest earned since the last coupon date that the bond buyer pays the seller; it is the difference between the dirty (invoice) price and the clean (quoted) price. (Book 4, Ch 9)
- **Adjusted R²** — A version of R² penalized for the number of regressors, so it rises only when an added variable improves fit by more than chance. (Book 2, Ch 8)
- **Adverse selection** — The tendency of those most likely to suffer a loss to seek out insurance or credit, so a pool attracts worse-than-average risks when the seller cannot distinguish risk types. (Book 1, Ch 2; Book 3, Ch 2)
- **Altman Z-score** — A credit-scoring model that combines weighted accounting ratios (working capital, retained earnings, EBIT, equity, sales relative to assets) into a single score; low values (roughly below 1.8) signal high bankruptcy risk. (Book 4, Ch 4)
- **American option** — An option that can be exercised at any time up to and including expiration; never worth less than the otherwise identical European option. (Book 3, Ch 12)
- **Arbitrage** — A strategy that generates riskless profit with no net investment by exploiting price discrepancies; in well-functioning markets arbitrage opportunities are competed away, which underpins derivative pricing. (Book 4, Ch 9)
- **Arbitrage Pricing Theory (APT)** — A multifactor model in which expected return is the risk-free rate plus the sum of factor betas times factor risk premiums; it relies on no-arbitrage and well-diversified portfolios rather than CAPM's equilibrium assumptions. (Book 1, Ch 6)
- **Asian option** — An exotic option whose payoff depends on the average price of the underlying over a period rather than the terminal price, reducing exposure to price manipulation and volatility at expiry. (Book 3, Ch 15)
- **Autocorrelation (serial correlation)** — Correlation of a variable (or regression residual) with its own lagged values; in regression it leaves OLS coefficients unbiased but invalidates conventional standard errors. (Book 2, Ch 9–10)

## B

- **Backtesting** — Comparing model predictions with realized outcomes, e.g., counting days on which losses exceed VaR ("exceptions") to judge whether the model's coverage is consistent with its stated confidence level. (Book 4, Ch 2)
- **Backwardation** — A futures market in which the futures price lies below the expected future spot price (or, loosely, below the current spot price); consistent with hedgers being net short and speculators net long. (Book 3, Ch 7, 11)
- **Barrier option** — An exotic option that comes into existence (knock-in) or ceases to exist (knock-out) when the underlying crosses a specified barrier level. (Book 3, Ch 15)
- **Basis** — Spot price of the asset being hedged minus the futures price of the contract used: $$b = S - F$$. The basis converges to zero (or to a carry-related differential) at delivery. (Book 3, Ch 8)
- **Basis point (bp)** — One-hundredth of one percent, 0.01% = 0.0001; the standard unit for quoting rate changes and spreads.
- **Basis risk** — Hedging risk arising because the basis at the time the hedge is lifted is uncertain — due to asset mismatch, maturity mismatch, or location mismatch between the exposure and the futures contract. (Book 3, Ch 8)
- **Bayes' theorem** — Rule for updating probabilities with new information: $$P(A\mid B) = \dfrac{P(B\mid A)\,P(A)}{P(B)}$$. (Book 2, Ch 1)
- **Bernoulli distribution** — Distribution of a single trial with outcome 1 (probability p) or 0 (probability 1 − p); the building block for modeling individual defaults. (Book 2, Ch 3)
- **Beta** — Sensitivity of an asset's return to the market return, $$\beta_i = \dfrac{\operatorname{Cov}(R_i, R_m)}{\operatorname{Var}(R_m)}$$; the measure of systematic risk priced in the CAPM. (Book 1, Ch 5)
- **Bid–ask spread** — Difference between the price at which dealers will sell (ask) and buy (bid); a direct measure of transaction cost and market liquidity. (Book 3, Ch 5)
- **Binomial distribution** — Distribution of the number of successes in n independent Bernoulli trials with success probability p; mean np, variance np(1 − p). Used for counting defaults and VaR exceptions. (Book 2, Ch 3)
- **Binomial tree** — A discrete-time lattice in which the underlying moves up by factor u or down by factor d each step; options are valued by risk-neutral expectation discounted at the risk-free rate, with $$p = \dfrac{e^{r\Delta t} - d}{u - d}$$. (Book 4, Ch 14)
- **Black-Scholes-Merton (BSM) model** — Closed-form European option pricing model assuming lognormal prices and constant volatility: $$c = S_0 N(d_1) - K e^{-rT} N(d_2)$$. (Book 4, Ch 15)
- **Bootstrapping (statistical)** — Resampling observed data with replacement to approximate the sampling distribution of an estimator without distributional assumptions; includes i.i.d. and circular block variants. (Book 2, Ch 13)
- **Bootstrapping (yield curve)** — Iteratively extracting zero (spot) rates from the prices of coupon bonds or swap quotes, starting with the shortest maturity and working outward. (Book 4, Ch 9–10)

## C

- **Call option** — The right, without the obligation, to buy the underlying at the strike price on (European) or by (American) expiration. (Book 3, Ch 12)
- **Capital Asset Pricing Model (CAPM)** — Equilibrium model in which only systematic risk is priced: $$E(R_i) = R_f + \beta_i\,[E(R_m) - R_f]$$. (Book 1, Ch 5)
- **Central clearing** — Post-trade arrangement in which a central counterparty interposes itself between buyer and seller, becoming the buyer to every seller and the seller to every buyer; mandated for standardized OTC derivatives after the 2007–2009 crisis. (Book 3, Ch 6)
- **Central counterparty (CCP)** — The clearinghouse that performs central clearing, managing counterparty risk through novation, netting, initial and variation margin, and a default fund (the "default waterfall"). (Book 3, Ch 6)
- **Central limit theorem** — The standardized mean of n i.i.d. random variables with finite variance converges to a standard normal distribution as n grows, regardless of the underlying distribution. (Book 2, Ch 5)
- **Cheapest-to-deliver (CTD)** — In Treasury bond futures, the deliverable bond that minimizes the short's delivery cost, i.e., minimizes quoted bond price minus (settlement price × conversion factor). (Book 3, Ch 19)
- **Clean price** — Quoted bond price excluding accrued interest; the U.S. quoting convention for Treasury bonds. Compare dirty price. (Book 4, Ch 9)
- **Coherent risk measure** — A risk measure satisfying monotonicity, translation invariance, positive homogeneity, and subadditivity; expected shortfall is coherent, VaR generally is not because it can violate subadditivity. (Book 4, Ch 1)
- **Collateral** — Assets posted to secure performance on an obligation (e.g., margin on derivatives, repo collateral); reduces counterparty credit risk but creates liquidity demands. (Book 3, Ch 5–6)
- **Comparative advantage** — The argument that two firms can both lower funding costs by borrowing in the market where each has a relative (not absolute) cost edge and swapping payments; the classic motivation for interest rate swaps. (Book 3, Ch 20)
- **Compounding frequency / continuous compounding** — Convention defining how quoted rates accrue; with continuous compounding a deposit grows as $$A e^{rT}$$, the convention used throughout derivatives pricing. (Book 3, Ch 16)
- **Conditional prepayment rate (CPR)** — Annualized rate at which a mortgage pool's outstanding principal prepays; related to the monthly measure by $$\text{SMM} = 1 - (1 - \text{CPR})^{1/12}$$. (Book 3, Ch 18)
- **Confidence interval** — A range constructed from sample data that contains the true parameter with a stated probability across repeated samples, e.g., estimate ± critical value × standard error. (Book 2, Ch 6)
- **Contango** — A futures market in which the futures price lies above the expected future spot price (or, loosely, above the current spot price). (Book 3, Ch 7, 11)
- **Convenience yield** — The benefit, beyond monetary income, from physically holding a consumption commodity (e.g., keeping a production process running); it lowers the futures price relative to full carry. (Book 3, Ch 11)
- **Convexity (bond)** — Second-order sensitivity of bond price to yield, $$C = \dfrac{1}{P}\dfrac{d^2P}{dy^2}$$; combined with duration it improves the price-change approximation $$\dfrac{\Delta P}{P} \approx -D\,\Delta y + \tfrac{1}{2} C (\Delta y)^2$$. Positive convexity means prices rise more when yields fall than they drop when yields rise. (Book 4, Ch 12)
- **Convexity adjustment (futures vs. forwards)** — The amount by which the rate implied by an interest rate futures contract (e.g., Eurodollar/SOFR futures) exceeds the corresponding forward rate, caused by daily settlement: forward ≈ futures − ½σ²t₁t₂. (Book 3, Ch 19)
- **Copula** — A function that joins marginal distributions into a joint distribution, allowing the dependence structure (e.g., Gaussian or Student's t copula) to be modeled separately from the marginals. (Book 2, Ch 4)
- **Correlation** — Standardized linear dependence between two variables, $$\rho = \dfrac{\operatorname{Cov}(X,Y)}{\sigma_X \sigma_Y}$$, bounded between −1 and +1; captures only linear relationships. (Book 2, Ch 4–5)
- **Cost of carry** — The net cost of holding the underlying (financing plus storage minus income); for an investment asset the no-arbitrage futures price is $$F_0 = S_0 e^{cT}$$, reduced by any convenience yield for consumption assets. (Book 3, Ch 10–11)
- **Country risk** — Risk from investing or lending in a particular country, driven by political risk, legal systems, economic structure, and the sovereign's willingness and ability to pay; measured via sovereign ratings, sovereign spreads, and CDS spreads. (Book 4, Ch 5)
- **Covariance** — Expected product of two variables' deviations from their means; positive when they move together. The covariance matrix is the input for portfolio variance. (Book 2, Ch 4)
- **Covered interest rate parity** — No-arbitrage relation tying forward FX rates to interest differentials: $$F_0 = S_0\, e^{(r - r_f)T}$$ (domestic rate r, foreign rate r_f); deviations are eliminated by riskless arbitrage. (Book 3, Ch 9)
- **Credit default swap (CDS)** — Contract in which the protection buyer pays a periodic spread and receives a payoff if a reference entity suffers a credit event; the basic instrument for transferring default risk. (Book 1, Ch 4)
- **Credit rating** — An ordinal assessment of creditworthiness (e.g., AAA to C/D) issued by external agencies or produced internally; "through-the-cycle" external ratings change slowly, whereas "point-in-time" internal measures track current conditions. (Book 4, Ch 4)
- **Credit risk** — Risk of loss because a borrower or counterparty fails to perform; its expected-loss building blocks are PD, LGD, and EAD. (Book 1, Ch 1; Book 4, Ch 6)
- **Credit risk transfer** — Shifting credit exposure to other parties via guarantees, credit insurance, CDS, securitization, and related structures; benefits include risk dispersion, but it can weaken monitoring incentives, as in the originate-to-distribute model. (Book 1, Ch 4)
- **Cross hedge** — Hedging an exposure with futures on a different but correlated asset (e.g., jet fuel hedged with heating oil futures); introduces basis risk and motivates the minimum-variance hedge ratio. (Book 3, Ch 8)
- **Currency swap** — Exchange of principal and interest payments in one currency for principal and interest in another; unlike interest rate swaps, principal amounts are typically exchanged at the start and end. (Book 3, Ch 20)

## D

- **Delta** — First-order sensitivity of an option (or portfolio) value to the underlying price, $$\Delta = \partial f / \partial S$$; for a European call under BSM, Δ = N(d₁). (Book 4, Ch 16)
- **Delta hedging** — Neutralizing small-move exposure by holding −Δ of the underlying against an option position; requires dynamic rebalancing because delta changes with S and time. (Book 4, Ch 16)
- **Derivative** — A contract whose value derives from an underlying asset, rate, or index; main building blocks are forwards, futures, swaps, and options. (Book 3, Ch 4)
- **Dirty (invoice) price** — Full price actually paid for a bond: clean price plus accrued interest. (Book 4, Ch 9)
- **Diversification** — Reducing portfolio risk by combining imperfectly correlated assets; eliminates idiosyncratic risk but not systematic risk. (Book 1, Ch 5)
- **Duration (Macaulay)** — Weighted-average time to a bond's cash flows, with present-value weights; for a zero-coupon bond it equals maturity. (Book 4, Ch 12)
- **Duration (modified)** — Percentage price sensitivity to yield: $$D_{mod} = -\dfrac{1}{P}\dfrac{dP}{dy} = \dfrac{D_{Mac}}{1 + y/m}$$, so ΔP/P ≈ −D_mod Δy. (Book 4, Ch 12)
- **Duration (effective)** — Duration computed by repricing the instrument under up and down rate shifts; appropriate for bonds with embedded options or other rate-dependent cash flows (e.g., MBS). (Book 4, Ch 12)
- **DV01** — Dollar value of a basis point: the change in a position's value for a one-basis-point change in rates, $$\text{DV01} = D_{mod} \times P \times 0.0001$$; the basis for hedge ratios between rate instruments. (Book 4, Ch 12)

## E

- **Economic capital** — Capital a firm estimates it needs to absorb unexpected losses at a chosen confidence level over a horizon; the denominator in RAROC and the internal counterpart to regulatory capital. (Book 1, Ch 7)
- **Efficient frontier** — In mean-variance analysis, the set of portfolios offering the highest expected return for each level of risk; with a risk-free asset it becomes the capital market line through the market portfolio. (Book 1, Ch 5)
- **Enterprise risk management (ERM)** — A firm-wide, integrated approach to identifying, measuring, and managing all material risks against a single risk appetite, rather than managing risks in silos. (Book 1, Ch 8)
- **European option** — An option exercisable only at expiration. (Book 3, Ch 12)
- **EWMA (exponentially weighted moving average)** — Volatility updating scheme $$\sigma_n^2 = \lambda \sigma_{n-1}^2 + (1-\lambda)\, u_{n-1}^2$$ that weights recent returns more heavily; RiskMetrics popularized λ = 0.94 for daily data. (Book 4, Ch 3)
- **Exotic option** — A nonstandard option such as Asian, barrier, lookback, binary/digital, compound, chooser, or gap options, typically traded OTC and engineered for specific payoff needs. (Book 3, Ch 15)
- **Expected loss (EL)** — The mean credit loss, priced into spreads and provisioned for: $$\text{EL} = \text{PD} \times \text{LGD} \times \text{EAD}$$. (Book 4, Ch 6)
- **Expected shortfall (ES)** — The expected loss conditional on the loss exceeding VaR at the chosen confidence level; also called conditional VaR or expected tail loss. It is coherent (subadditive) and captures tail severity that VaR ignores. (Book 4, Ch 1)
- **Exposure at default (EAD)** — The amount expected to be owed by the obligor at the time of default, including expected drawdowns of committed lines. (Book 4, Ch 6)

## F

- **Fat tails (leptokurtosis)** — Excess kurtosis relative to the normal distribution, meaning extreme outcomes are more likely than a normal model implies; characteristic of financial returns. (Book 2, Ch 12)
- **Forward contract** — OTC agreement to buy or sell an asset at a set price on a future date; customizable, settled at maturity, and exposed to counterparty risk. (Book 3, Ch 4)
- **Forward rate** — The interest rate implied by today's term structure for a future period, e.g., from spot rates: $$f = \dfrac{r_2 T_2 - r_1 T_1}{T_2 - T_1}$$ (continuous compounding). (Book 3, Ch 16; Book 4, Ch 10)
- **Forward rate agreement (FRA)** — OTC contract fixing the interest rate to apply to a notional amount over a future period, cash-settled against the realized reference rate. (Book 3, Ch 16)
- **Futures contract** — Exchange-traded, standardized forward with daily marking to market through a margin account and a CCP guarantee, which nearly eliminates counterparty risk. (Book 3, Ch 7)

## G

- **Gamma** — Second-order sensitivity of an option to the underlying price, $$\Gamma = \partial^2 f / \partial S^2$$; largest for at-the-money, near-expiry options. A delta-neutral, positive-gamma position gains from large moves in either direction. (Book 4, Ch 16)
- **GARCH(1,1)** — Volatility model $$\sigma_n^2 = \omega + \alpha u_{n-1}^2 + \beta \sigma_{n-1}^2$$ with α + β < 1; unlike EWMA it is mean-reverting, with long-run variance $$V_L = \omega / (1 - \alpha - \beta)$$. (Book 4, Ch 3)
- **GARP Code of Conduct** — Mandatory standards for FRM candidates and certified members covering professional integrity, conflicts of interest, confidentiality, and best practices; violations can lead to revocation of the FRM designation. (Book 1, Ch 11)
- **Geometric Brownian motion** — Continuous-time process $$dS = \mu S\,dt + \sigma S\,dz$$ assumed for stock prices in BSM; it implies lognormally distributed future prices. (Book 4, Ch 14–15)
- **Greeks** — The option sensitivity measures — delta, gamma, theta, vega, and rho — used to quantify and hedge the exposures of option portfolios. (Book 4, Ch 16)

## H

- **Haircut** — Discount applied to collateral value (e.g., in repo) to protect the lender against collateral price declines. (Book 3, Ch 5)
- **Hazard rate** — The instantaneous default intensity λ; the probability of default between t and t + dt, conditional on survival to t, is λ dt, giving survival probability $$e^{-\lambda t}$$. (Book 4, Ch 6)
- **Hedge ratio** — Size of the futures position per unit of exposure; the minimum-variance hedge ratio is $$h^* = \rho\,\dfrac{\sigma_S}{\sigma_F}$$, and the optimal number of contracts is h*·Q_A/Q_F. (Book 3, Ch 8)
- **Heteroskedasticity** — Non-constant variance of regression errors across observations; OLS coefficients remain unbiased but conventional standard errors are wrong, motivating robust (White) standard errors. (Book 2, Ch 9)
- **Historical simulation** — Nonparametric VaR/ES method that revalues today's portfolio under past return scenarios and reads risk measures from the empirical loss distribution; weighted and filtered variants address stale data. (Book 4, Ch 2)
- **Hypothesis testing** — Framework for using sample evidence to decide between a null hypothesis H₀ and an alternative, controlling the probability of false rejection at a chosen significance level. (Book 2, Ch 6)

## I

- **Idiosyncratic (specific) risk** — Risk unique to a firm or asset that diversification can eliminate; it earns no risk premium in the CAPM. (Book 1, Ch 5)
- **Implied volatility** — The volatility that equates a model price (usually BSM) to the observed market option price; the market's volatility quote, and the input behind smile and surface patterns. (Book 4, Ch 15)
- **Information ratio** — Active return per unit of active risk: alpha (return relative to benchmark) divided by tracking error; used to evaluate active managers. (Book 1, Ch 7)
- **Initial margin** — Collateral deposited when a futures or cleared position is opened, sized to cover potential close-out losses in a default. (Book 3, Ch 6–7)
- **Interest rate swap** — Agreement to exchange fixed-rate interest for floating-rate interest (now typically SOFR-based) on a notional principal; valued as a portfolio of FRAs or as long one bond and short another. (Book 3, Ch 20)

## J

- **Jensen's alpha** — Average return above the CAPM-required return, $$\alpha = R_p - [R_f + \beta_p(R_m - R_f)]$$; a risk-adjusted performance measure. (Book 1, Ch 5, 7)

## K

- **K-means clustering** — Unsupervised learning algorithm that partitions observations into K clusters by iteratively assigning points to the nearest centroid and recomputing centroids; K is chosen by the analyst (e.g., elbow or silhouette methods). (Book 2, Ch 14)
- **K-nearest neighbors (KNN)** — Supervised method that classifies or predicts an observation from the K most similar training observations; small K gives flexible but noisy fits. (Book 2, Ch 15)
- **Key rate duration** — Sensitivity of a portfolio's value to a shift in one segment ("key rate") of the term structure with other rates unchanged; key rate exposures enable hedging of non-parallel curve moves. (Book 4, Ch 13)
- **Kurtosis** — Standardized fourth moment measuring tail heaviness; the normal distribution has kurtosis 3, and excess kurtosis above 0 indicates fat tails. (Book 2, Ch 5)

## L

- **Lasso** — See Regularization; the L1-penalized regression that shrinks some coefficients exactly to zero, performing variable selection. (Book 2, Ch 14)
- **Law of one price** — Two positions with identical future cash flows must trade at the same price, else arbitrage exists; the foundation of relative pricing of bonds and derivatives. (Book 4, Ch 9)
- **LIBOR** — The former interbank offered rate, a survey-based unsecured term rate; manipulation scandals and thin underlying markets led to its phase-out (final USD panel settings ended June 2023) in favor of nearly risk-free rates such as SOFR. (Book 3, Ch 16)
- **Liquidity risk** — Risk of being unable to transact quickly at prevailing prices (market liquidity risk) or to meet cash obligations as they fall due (funding liquidity risk); the two interact destructively in crises. (Book 1, Ch 1)
- **Logistic regression** — Regression for binary outcomes that models the probability of the event via the logistic function; a workhorse for default prediction and a baseline machine-learning classifier. (Book 2, Ch 15)
- **Lognormal distribution** — Distribution of a variable whose logarithm is normal; under BSM assumptions, $$\ln S_T \sim N\!\left(\ln S_0 + (\mu - \sigma^2/2)T,\ \sigma^2 T\right)$$, so prices stay positive. (Book 2, Ch 3; Book 4, Ch 15)
- **Lookback option** — Exotic option whose payoff depends on the maximum or minimum underlying price over the option's life. (Book 3, Ch 15)
- **Loss given default (LGD)** — Fraction of exposure lost if default occurs, equal to one minus the recovery rate. (Book 4, Ch 6)

## M

- **Maintenance margin** — Futures account balance threshold; if equity falls below it, the trader receives a margin call to restore the balance to the initial margin level. (Book 3, Ch 7)
- **Marking to market** — Daily revaluation of futures (and cleared) positions at settlement prices, with gains and losses passing through margin accounts as variation margin. (Book 3, Ch 7)
- **Mean reversion** — Tendency of a variable (e.g., variance in GARCH, interest rates) to be pulled back toward a long-run level over time. (Book 4, Ch 3)
- **Merton model** — Structural credit model viewing equity as a European call on the firm's assets with strike equal to the debt's face value; default occurs if asset value is below the debt due at maturity, and it yields PD and credit spread estimates. (Book 4, Ch 6)
- **Model risk** — Risk of loss from using misspecified, miscalibrated, or misapplied models; managed through validation, benchmarking, conservative adjustments, and governance. (Book 1, Ch 9)
- **Moneyness** — Relationship between the underlying price and strike: in-the-money (immediate exercise would pay), at-the-money (S ≈ K), out-of-the-money (no exercise value). (Book 3, Ch 12)
- **Monte Carlo simulation** — Generating many random paths or draws from assumed distributions to value instruments or build a loss distribution; flexible but computationally heavy and subject to sampling error and model risk. (Book 2, Ch 13; Book 4, Ch 2)
- **Moral hazard** — The tendency of a protected party to take more risk because another party bears the consequences (e.g., insured firms, originate-to-distribute lenders, too-big-to-fail banks). (Book 1, Ch 2, 4)
- **Mortgage-backed security (MBS)** — Security backed by a pool of mortgages whose cash flows pass through to investors; agency MBS carry guarantee protection against default but expose holders to prepayment risk. (Book 3, Ch 18)
- **Multicollinearity** — High correlation among regressors, inflating coefficient standard errors and making individual effects hard to identify even when the regression fits well overall. (Book 2, Ch 9)

## N

- **Netting** — Offsetting amounts owed between counterparties (close-out or payment netting) so only the net amount changes hands; sharply reduces counterparty exposure, and is a core CCP benefit (multilateral netting). (Book 3, Ch 5–6)
- **Neural network** — Machine-learning model that passes weighted inputs through layers of nonlinear activation functions; highly flexible, requiring regularization and validation data to control overfitting. (Book 2, Ch 15)
- **Normal distribution** — Symmetric bell-shaped distribution fully described by mean and variance; about 68%, 95%, and 99.7% of mass lies within 1, 2, and 3 standard deviations of the mean. (Book 2, Ch 3)
- **Normal vs. inverted futures market** — Settlement prices increasing with contract maturity define a normal market; prices declining with maturity define an inverted market. (Book 3, Ch 7)
- **Notional principal** — Reference amount used to compute payments on swaps and other derivatives; usually not exchanged (except in currency swaps). (Book 3, Ch 20)

## O

- **Omitted variable bias** — Bias in OLS coefficients arising when an excluded variable both affects the dependent variable and is correlated with included regressors. (Book 2, Ch 8–9)
- **Open interest** — Total number of futures or options contracts outstanding (one long and one short per contract); unlike volume, it measures open positions rather than trading activity. (Book 3, Ch 7)
- **Operational risk** — Risk of loss from inadequate or failed internal processes, people, and systems, or from external events; includes legal risk but excludes strategic and reputational risk under Basel definitions. (Book 4, Ch 7)
- **Over-the-counter (OTC) market** — Decentralized dealer market for customized contracts; post-crisis reforms pushed standardized OTC derivatives into central clearing and uncleared trades into bilateral margin requirements. (Book 3, Ch 5)
- **Overfitting** — Fitting noise in the training data so a model performs well in-sample but poorly out-of-sample; countered with regularization, cross-validation, and held-out test data. (Book 2, Ch 14)

## P

- **p-value** — Probability, under the null hypothesis, of obtaining a test statistic at least as extreme as the one observed; reject the null when the p-value is below the chosen significance level. (Book 2, Ch 6)
- **Par rate** — Coupon rate that makes a bond price equal to its face value given the current term structure of discount factors. (Book 4, Ch 10)
- **Poisson distribution** — Distribution for the count of events in an interval given a constant arrival rate λ; mean and variance both equal λ. Standard model for operational loss frequency. (Book 2, Ch 3; Book 4, Ch 7)
- **Power of a test** — Probability of correctly rejecting a false null hypothesis, equal to 1 minus the Type II error probability; rises with sample size and effect size. (Book 2, Ch 6)
- **Prepayment risk** — Uncertainty in MBS cash-flow timing because homeowners can prepay, typically refinancing when rates fall; it gives MBS negative convexity. (Book 3, Ch 18)
- **Principal components analysis (PCA)** — Unsupervised technique that re-expresses correlated variables as orthogonal components ordered by variance explained; applied to yield curves, the first three components are level, slope, and curvature. (Book 2, Ch 14; Book 4, Ch 13)
- **Probability of default (PD)** — Likelihood that an obligor defaults over a stated horizon (commonly one year); estimated from ratings histories, structural models, or credit spreads. (Book 4, Ch 6)
- **PSA prepayment benchmark** — Standard prepayment path: at 100 PSA, CPR rises 0.2% per month to 6% at month 30 and stays there; pools are quoted as multiples (e.g., 150 PSA). (Book 3, Ch 18)
- **Put option** — The right, without the obligation, to sell the underlying at the strike price. (Book 3, Ch 12)
- **Put-call parity** — No-arbitrage relation for European options on the same strike and expiry: $$c + K e^{-rT} = p + S_0$$ (adjusted for income on the underlying); violations create arbitrage. (Book 3, Ch 13)

## Q

- **Quantile** — The value below which a stated fraction of a distribution lies; VaR at confidence level X% is a quantile of the loss distribution. (Book 2, Ch 2)

## R

- **R² (coefficient of determination)** — Fraction of the dependent variable's variation explained by a regression, ESS/TSS; in a single-variable regression it equals the squared correlation between fitted and actual values. (Book 2, Ch 7)
- **Random walk** — Nonstationary process $$y_t = y_{t-1} + \varepsilon_t$$ whose variance grows with time; first-differencing produces a stationary series. (Book 2, Ch 11)
- **RAROC (risk-adjusted return on capital)** — Performance measure used for capital allocation: $$\text{RAROC} = \dfrac{\text{revenues} - \text{costs} - \text{expected losses}}{\text{economic capital}}$$, compared against a hurdle rate. (Book 1, Ch 7)
- **Recovery rate** — Fraction of exposure recovered after default (typically measured from post-default bond prices); equals 1 − LGD and tends to fall when default rates spike. (Book 4, Ch 6)
- **Regression (linear)** — Modeling a dependent variable as a linear function of explanatory variables plus an error term, with coefficients estimated by ordinary least squares (OLS). (Book 2, Ch 7–8)
- **Regularization** — Penalizing model complexity to reduce overfitting: ridge adds an L2 penalty that shrinks coefficients, lasso adds an L1 penalty that can zero them out, and elastic net combines both. (Book 2, Ch 14)
- **Repurchase agreement (repo)** — Sale of securities with agreement to repurchase at a higher price; economically a collateralized loan whose implied rate is the repo rate. (Book 3, Ch 5)
- **Reverse stress testing** — Starting from a defined failure outcome (e.g., insolvency or breach of capital) and working backward to identify scenarios that could cause it; complements conventional stress tests. (Book 4, Ch 8)
- **Rho** — Sensitivity of an option's value to the risk-free interest rate; positive for calls, negative for puts. (Book 4, Ch 16)
- **Ridge regression** — See Regularization; the L2-penalized regression that shrinks all coefficients toward zero without eliminating them. (Book 2, Ch 14)
- **Risk appetite** — The amount and types of risk a firm is willing to take in pursuit of its objectives, set by the board and cascaded into limits via a risk appetite statement. (Book 1, Ch 2–3)
- **Risk-free rate** — Return on a default-free investment; derivatives practice has shifted from LIBOR proxies toward overnight rates such as SOFR (with repo and T-bill rates as alternatives). (Book 3, Ch 16)
- **Risk-neutral valuation** — Pricing derivatives as the expected payoff under the risk-neutral measure (where all assets earn the risk-free rate) discounted at the risk-free rate; valid because the hedged position is riskless, regardless of actual risk preferences. (Book 4, Ch 14)

## S

- **Scenario analysis** — Assessing portfolio outcomes under specified hypothetical or historical scenarios (often joint moves in several risk factors), without necessarily attaching probabilities. (Book 4, Ch 8)
- **Securitization** — Pooling assets (mortgages, loans, receivables) in a special purpose vehicle and issuing tranched securities against the pool's cash flows; a major credit risk transfer channel central to the 2007–2009 crisis. (Book 1, Ch 4, 10)
- **Sharpe ratio** — Excess return per unit of total risk: $$\dfrac{R_p - R_f}{\sigma_p}$$; appropriate when the portfolio represents an investor's total wealth. (Book 1, Ch 7)
- **Short selling** — Selling a borrowed security with the obligation to repurchase and return it later, profiting if its price falls. (Book 3, Ch 4)
- **Single monthly mortality (SMM)** — Monthly proportion of a mortgage pool's beginning-of-month balance (net of scheduled principal) that prepays; annualizes to CPR. (Book 3, Ch 18)
- **Skewness** — Standardized third moment measuring asymmetry; negative skew (long left tail) is typical of equity returns and credit portfolios. (Book 2, Ch 5)
- **SOFR (Secured Overnight Financing Rate)** — Overnight U.S. rate based on Treasury repo transactions; the main USD replacement for LIBOR, with term rates built by compounding daily SOFR in arrears. (Book 3, Ch 16)
- **Sortino ratio** — Excess return (over a minimum acceptable return) divided by downside deviation, penalizing only below-target volatility. (Book 1, Ch 7)
- **Spot (zero) rate** — Yield on a zero-coupon instrument for a given maturity; the set of spot rates is the zero curve used to discount each cash flow. (Book 3, Ch 16; Book 4, Ch 10)
- **Stack-and-roll hedge** — Hedging a long-dated exposure with a stack of short-dated futures rolled forward at each expiry; introduces rollover (basis) risk, as in the Metallgesellschaft case. (Book 3, Ch 8; Book 1, Ch 9)
- **Stationarity (covariance)** — Property of a time series whose mean and variance are constant and whose autocovariances depend only on the lag; a prerequisite for standard time-series modeling (AR/MA/ARMA). (Book 2, Ch 10)
- **Straddle** — Long call plus long put on the same strike and expiry; a bet on large movement (high realized volatility) in either direction. (Book 3, Ch 14)
- **Stress testing** — Evaluating losses and capital adequacy under severe but plausible scenarios; complements VaR by probing tail events outside the historical sample, and includes regulatory programs such as CCAR. (Book 4, Ch 8)
- **Strike (exercise) price** — The price at which an option holder may buy (call) or sell (put) the underlying. (Book 3, Ch 12)
- **Subadditivity** — Property that the risk of a combined portfolio is no greater than the sum of standalone risks, $$\rho(A+B) \le \rho(A) + \rho(B)$$; reflects diversification, satisfied by ES but not always by VaR. (Book 4, Ch 1)
- **Swap** — Agreement to exchange streams of cash flows on set dates according to a formula; principal types in Part I are interest rate swaps and currency swaps. (Book 3, Ch 20)
- **Systematic risk** — Market-wide risk that cannot be diversified away; the only risk rewarded with a premium in the CAPM. (Book 1, Ch 5)

## T

- **t-statistic** — Estimate minus hypothesized value, divided by the estimate's standard error; compared to the Student's t (or normal) distribution to test hypotheses about means and regression coefficients. (Book 2, Ch 6–7)
- **Tailing the hedge** — Slightly reducing a futures hedge position to correct for the interest earned on daily mark-to-market cash flows, aligning futures hedging with forward-style exposure. (Book 3, Ch 8)
- **Term structure theories** — Explanations of yield curve shape: unbiased expectations (forwards equal expected future spot rates), liquidity preference (investors demand a premium for long maturities, biasing the curve upward), and market segmentation (supply and demand within maturity habitats). (Book 3, Ch 16; Book 4, Ch 10)
- **Theta** — Sensitivity of an option's value to the passage of time (time decay); usually negative for long option positions. (Book 4, Ch 16)
- **Tracking error** — Standard deviation of the difference between portfolio and benchmark returns; the denominator of the information ratio. (Book 1, Ch 7)
- **Train/validation/test split** — Partitioning data so the model is fit on the training set, tuned (hyperparameters selected) on the validation set, and evaluated once on the untouched test set to estimate true out-of-sample performance. (Book 2, Ch 14)
- **Transition matrix** — Table of probabilities that an obligor migrates from one rating to another (or defaults) over a horizon; multi-period transitions are obtained by matrix multiplication under a Markov assumption. (Book 4, Ch 4, 6)
- **Treynor ratio** — Excess return per unit of systematic risk: $$\dfrac{R_p - R_f}{\beta_p}$$; appropriate for a well-diversified portfolio or one held within a larger diversified fund. (Book 1, Ch 7)
- **Type I error** — Rejecting a true null hypothesis (false positive); its probability is the significance level α. (Book 2, Ch 6)
- **Type II error** — Failing to reject a false null hypothesis (false negative); its probability is β, and power = 1 − β. (Book 2, Ch 6)

## U

- **Uncovered interest rate parity** — Hypothesis that expected exchange rate changes offset interest rate differentials; unlike covered parity it is not enforced by arbitrage, and its failure underlies the carry trade. (Book 3, Ch 9)
- **Unexpected loss (UL)** — Volatility of credit losses around the expected loss; capital, rather than pricing or provisions, is held against unexpected loss. (Book 4, Ch 6)
- **Unit root** — A root of one in a series' autoregressive polynomial (as in a random walk), making the series nonstationary with shocks that never decay; detected with augmented Dickey-Fuller tests and removed by differencing. (Book 2, Ch 11)

## V

- **Value at risk (VaR)** — The loss that will not be exceeded with probability X% over a stated horizon — i.e., the X% quantile of the loss distribution; it says nothing about the size of losses beyond that quantile. (Book 4, Ch 1–2)
- **Variation margin** — Cash transferred daily (or intraday) to settle mark-to-market gains and losses on futures and cleared positions. (Book 3, Ch 6–7)
- **Vasicek single-factor model** — Credit portfolio model in which each obligor's asset return loads on one systematic factor with common correlation; it yields the worst-case (e.g., 99.9%) default rate used in Basel capital formulas, $$\text{WCDR} = N\!\left(\dfrac{N^{-1}(\text{PD}) + \sqrt{\rho}\,N^{-1}(0.999)}{\sqrt{1-\rho}}\right)$$. (Book 4, Ch 6)
- **Vega** — Sensitivity of an option's value to the underlying's volatility; positive for long calls and puts, and hedgeable only with other options. (Book 4, Ch 16)
- **Volatility** — Standard deviation of returns, conventionally annualized via the square root of time, e.g., $$\sigma_{annual} = \sigma_{daily}\sqrt{252}$$. (Book 2, Ch 12)
- **Volatility smile / skew** — Pattern of implied volatility across strikes: a symmetric smile is typical of currency options, while equity options show a downward skew (higher implied vol at low strikes), reflecting fat tails and crash risk relative to lognormal assumptions. (Book 4, Ch 15)

## Y

- **Yield curve** — Plot of interest rates (spot, par, or forward) against maturity; its level, slope, and curvature summarize most of its variation. (Book 4, Ch 10)
- **Yield to maturity (YTM)** — Single discount rate that equates a bond's present value of cash flows to its price; realized return equals YTM only if the bond is held to maturity and coupons are reinvested at that same rate. (Book 4, Ch 11)

## Z

- **Z-score (standardized value)** — Number of standard deviations an observation lies from the mean, $$z = (x - \mu)/\sigma$$; the test statistic for normal-based hypothesis tests. See also Altman Z-score for the credit-scoring usage. (Book 2, Ch 6)
- **Zero-coupon bond** — Bond paying only face value at maturity, sold at a discount; its yield defines the spot (zero) rate, and its Macaulay duration equals its maturity. (Book 4, Ch 10)
