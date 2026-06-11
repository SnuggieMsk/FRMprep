---
title: "Book 3 Formulas"
parent: Formula Sheets
nav_order: 3
---

# Book 3 Formulas

Every testable formula in Financial Markets and Products, with definitions and the classic traps.

## Ch 1 — Banks

Net interest margin:

$$\text{NIM} = \frac{\text{Interest income} - \text{Interest expense}}{\text{Interest-earning assets}}$$

Return on equity decomposition:

$$\text{ROE} = \text{ROA} \times \frac{\text{Assets}}{\text{Equity}}$$

where ROA = net income / assets and assets/equity is the leverage multiplier. Higher leverage scales both ROE and risk.

*Trap:* Loan losses are charged against the loss reserve (provision), not directly against capital — but sustained losses deplete equity through earnings.

## Ch 2 — Insurance Companies and Pension Plans

$$\text{Loss ratio} = \frac{\text{Claims paid (incurred losses)}}{\text{Premiums earned}}$$

$$\text{Expense ratio} = \frac{\text{Expenses (underwriting, selling)}}{\text{Premiums earned}}$$

$$\text{Combined ratio} = \text{Loss ratio} + \text{Expense ratio}$$

$$\text{Combined ratio after dividends} = \text{Combined ratio} + \text{Policyholder dividend ratio}$$

$$\text{Operating ratio} = \text{Combined ratio after dividends} - \text{Investment income ratio}$$

All ratios are expressed as a percentage of premiums. An operating ratio below 100% means overall profitability even if the combined ratio exceeds 100%.

Breakeven (actuarially fair) premium: set PV of expected premium inflows equal to PV of expected payouts using mortality-table probabilities:

$$\sum_t P \cdot p(\text{alive at } t) \cdot e^{-rt} = \sum_t \text{Payout} \cdot p(\text{death in year } t) \cdot e^{-rt_d}$$

where $$P$$ = annual premium (paid only if alive), $$p(\cdot)$$ = survival/death probabilities from the mortality table, $$r$$ = discount rate, $$t_d$$ = assumed payout timing.

{: .warning }
Premiums are paid at the **start** of each year (only by survivors); death benefits are conventionally assumed paid **mid-year** (or year-end if stated). Mixing up the timing is the classic error on these questions.

## Ch 3 — Fund Management

$$\text{NAV per share} = \frac{\text{Assets} - \text{Liabilities}}{\text{Shares outstanding}}$$

Open-end funds trade at NAV (computed daily at 4 p.m.); closed-end funds trade at market prices, typically a discount to NAV. ETFs trade intraday near NAV via creation/redemption arbitrage.

Hedge fund "2 and 20":

$$\text{Fee} = 2\% \times \text{AUM} + 20\% \times \max(\text{Return} - \text{Hurdle}, 0) \times \text{AUM}$$

Incentive fee applies only to profits above the hurdle rate and only when NAV exceeds the high-water mark (prior peak NAV). *Trap:* the management fee (2%) is charged regardless of performance; check whether the question computes the 20% on return net of the management fee.

## Ch 4 — Introduction to Derivatives

Forward payoffs at maturity:

$$\text{Long: } S_T - K \qquad \text{Short: } K - S_T$$

Option payoffs:

$$\text{Long call: } \max(S_T - K, 0) \qquad \text{Long put: } \max(K - S_T, 0)$$

Short positions are the negatives. Profit:

$$\text{Profit} = \text{Payoff} - \text{FV(premium)}$$

where $$S_T$$ = asset price at maturity, $$K$$ = delivery/strike price. *Trap:* the exam usually ignores the future-valuing of the premium — profit = payoff − premium paid (or + premium received) unless rates are emphasized.

## Ch 5 — Exchanges and OTC Markets

Bilateral netting reduces exposure: with netting, exposure to a counterparty is

$$E = \max\!\left(\sum_i V_i,\, 0\right) \quad \text{vs.} \quad E = \sum_i \max(V_i, 0) \text{ without netting}$$

where $$V_i$$ = value of contract $$i$$ with that counterparty. The netting benefit grows with the number of offsetting contracts.

Margin types (collateral):

- **Variation margin** — covers current exposure; cash settling daily mark-to-market changes.
- **Initial margin** — covers potential future exposure over the close-out period; an extra cushion.
- **Haircuts** — discount applied to non-cash collateral value.

*Trap:* in OTC markets, variation margin commonly earns interest (it is a transfer against MTM); initial margin is a buffer that may be segregated.

## Ch 6 — Central Clearing

A CCP interposes itself via novation: one trade becomes two, with the CCP as buyer to every seller and seller to every buyer. Multilateral netting ratio idea: netted exposure / gross exposure falls as more members and offsetting trades are cleared through one CCP, but splitting products across multiple CCPs can reduce netting benefits.

CCP default waterfall (order of loss absorption):

1. Defaulting member's variation/initial margin
2. Defaulting member's default fund contribution
3. CCP's own equity contribution ("skin in the game")
4. Default fund contributions of surviving members
5. Unfunded assessments / rights on surviving members (recovery tools)

*Trap:* surviving members' initial margin is generally **not** mutualized — it is the default fund, not IM, that absorbs others' losses.

## Ch 7 — Futures Markets

Margin mechanics: equity is marked to market daily.

$$\text{Margin call when: Balance} < \text{Maintenance margin} \Rightarrow \text{top up to Initial margin}$$

{: .warning }
The variation margin call restores the balance to the **initial** margin, not the maintenance margin. Computing the top-up to maintenance is the single most common error.

Margin call size = Initial margin − current balance. Daily gain/loss = (change in futures price) × contract size × number of contracts.

Open interest rules: open interest = total number of long positions outstanding (= total shorts). A trade between a new long and a new short raises OI by 1; new long vs. existing long closing keeps OI unchanged; both sides closing reduces OI by 1. Volume counts every contract traded; OI counts only those left open.

## Ch 8 — Using Futures for Hedging

Basis:

$$b = S - F$$

where $$S$$ = spot price of asset being hedged, $$F$$ = futures price used. Basis strengthening (b up) helps a short hedger; weakening helps a long hedger.

Effective price for a short hedger closing at time 2:

$$\text{Effective price} = F_1 + b_2 = S_2 + (F_1 - F_2)$$

Minimum-variance hedge ratio:

$$h^* = \rho\,\frac{\sigma_S}{\sigma_F}$$

where $$\rho$$ = correlation between changes in spot and futures prices, $$\sigma_S, \sigma_F$$ = standard deviations of those changes.

Optimal number of contracts:

$$N^* = \frac{h^* Q_A}{Q_F}$$

where $$Q_A$$ = size of position being hedged (units), $$Q_F$$ = size of one futures contract (units). Tailing the hedge (accounts for daily settlement):

$$N^* = \frac{h^* V_A}{V_F}$$

where $$V_A$$ = dollar value of position, $$V_F$$ = dollar value of one futures contract (futures price × size).

Hedge effectiveness = proportion of variance eliminated:

$$\text{Effectiveness} = \rho^2$$

Stock index futures — full hedge:

$$N = \beta\,\frac{P}{F}$$

Changing portfolio beta from $$\beta$$ to $$\beta^*$$:

$$N = (\beta^* - \beta)\,\frac{P}{F}$$

where $$P$$ = portfolio value, $$F$$ = futures price × multiplier, $$\beta$$ = current beta. Positive N = buy futures (raising beta); negative N = sell futures.

*Trap:* $$F$$ here is the contract's dollar value (price × multiplier, e.g., × \$250 for S&P 500), not the index level alone.

## Ch 9 — Foreign Exchange Markets

Covered interest parity (continuous):

$$F = S\,e^{(r - r_f)T}$$

Discrete compounding:

$$F = S\,\frac{(1 + r)^T}{(1 + r_f)^T}$$

where $$S$$ = spot rate quoted as **domestic currency per unit of foreign**, $$r$$ = domestic rate, $$r_f$$ = foreign rate, $$T$$ = years.

{: .warning }
Get the quote direction right before anything else. If $$S$$ is domestic-per-foreign, the **domestic** rate goes on top (grows the numerator currency). If the quote is inverted, the roles of $$r$$ and $$r_f$$ flip. The currency with the lower interest rate trades at a forward premium.

Cross rates: chain quotes so currencies cancel, e.g.

$$\frac{\text{JPY}}{\text{EUR}} = \frac{\text{JPY}}{\text{USD}} \times \frac{\text{USD}}{\text{EUR}}$$

*Trap:* with bid–ask quotes, cross-rate bid uses the two rates that give the worst (lowest) product for the customer buying at bid; multiply bid × bid and ask × ask only when both quotes are in the same chaining direction.

## Ch 10 — Pricing Financial Forwards and Futures

Cost-of-carry, no income:

$$F_0 = S_0 e^{rT}$$

Known dollar income with PV $$I$$ (e.g., discrete dividends, coupons):

$$F_0 = (S_0 - I)e^{rT}$$

Known continuous yield $$q$$ (dividend yield; for FX, $$q = r_f$$):

$$F_0 = S_0 e^{(r - q)T}$$

where $$S_0$$ = spot price, $$r$$ = risk-free rate (continuous), $$T$$ = maturity in years.

Value of an existing long forward with delivery price $$K$$:

$$f = (F_0 - K)e^{-rT}$$

(short forward: $$f = (K - F_0)e^{-rT}$$). At inception $$K = F_0$$ so $$f = 0$$.

*Trap:* price vs. value — $$F_0$$ is reset by the market continuously; $$f$$ is what the locked-in contract is worth now. Don't forget to discount $$(F_0 - K)$$.

Forward vs. futures prices: equal if interest rates are deterministic. If the asset price is **positively** correlated with interest rates, futures price > forward price (daily settlement gains are reinvested at high rates); negative correlation implies futures < forward.

## Ch 11 — Commodity Forwards and Futures

Storage costs as PV lump sum $$U$$:

$$F_0 = (S_0 + U)e^{rT}$$

Storage as proportional rate $$u$$, convenience yield $$y$$:

$$F_0 = S_0 e^{(r + u - y)T}$$

Lease rate form (investment commodity earning lease rate $$\delta$$):

$$F_0 = S_0 e^{(r - \delta)T}$$

where $$U$$ = PV of storage costs, $$u$$ = storage cost rate, $$y$$ = convenience yield (benefit of physical holding), $$\delta$$ = lease rate. Storage costs act like negative income; convenience yield like positive income.

Implied convenience yield — solve from observed prices:

$$y = r + u - \frac{1}{T}\ln\!\frac{F_0}{S_0}$$

*Trap:* for consumption commodities, the cost-of-carry relation holds only as an inequality, $$F_0 \le S_0 e^{(r+u)T}$$ — the convenience yield is whatever closes the gap. Backwardation ($$F_0 < S_0$$) signals a high convenience yield.

## Ch 12 — Options Markets

$$\text{Intrinsic value (call)} = \max(S_0 - K, 0) \qquad \text{(put)} = \max(K - S_0, 0)$$

$$\text{Time value} = \text{Option price} - \text{Intrinsic value}$$

Moneyness: call is ITM if $$S > K$$, ATM if $$S = K$$, OTM if $$S < K$$ (reverse for puts).

Naked option writer margin (per share, then × 100 per contract):

$$\text{Margin} = \max\big(\text{Premium} + 20\%\,S_0 - \text{OTM amount},\;\ \text{Premium} + 10\% \times \text{Underlying}\big)$$

where the OTM amount is the amount by which the option is out of the money (zero if ITM); for the second term "underlying" is $$S_0$$ for calls and $$K$$ for puts.

*Trap:* subtract the OTM amount only in the 20% leg, and never let the result fall below the 10% floor.

Stock split / stock dividend adjustment — an $$n$$-for-$$m$$ split:

$$K_{\text{new}} = K \times \frac{m}{n} \quad (\text{i.e., } K \times \text{old/new}), \qquad \text{Contracts cover } \frac{n}{m} \times 100 \text{ shares}$$

*Trap:* terms are adjusted for splits and stock dividends, **not** for cash dividends.

## Ch 13 — Properties of Options

Bounds (non-dividend stock; $$c, p$$ European, $$C, P$$ American):

$$c \le S_0, \quad C \le S_0, \qquad p \le Ke^{-rT}, \quad P \le K$$

$$c \ge \max(S_0 - Ke^{-rT}, 0) \qquad p \ge \max(Ke^{-rT} - S_0, 0)$$

With dividends (PV of dividends $$D$$):

$$c \ge \max(S_0 - D - Ke^{-rT}, 0) \qquad p \ge \max(D + Ke^{-rT} - S_0, 0)$$

American options: $$C \ge c$$, $$P \ge p$$, and $$C \ge \max(S_0 - K, 0)$$, $$P \ge \max(K - S_0, 0)$$ (worth at least intrinsic).

Put–call parity (European, no dividends):

$$c + Ke^{-rT} = p + S_0$$

With dividends (PV $$D$$):

$$c + D + Ke^{-rT} = p + S_0$$

American band (with dividends):

$$S_0 - D - K \le C - P \le S_0 - Ke^{-rT}$$

(no dividends: replace $$S_0 - D - K$$ with $$S_0 - K$$).

Early exercise:

- American **call** on a non-dividend stock: never exercise early ($$C = c$$). With dividends, early exercise can be optimal only immediately before an ex-dividend date.
- American **put**: early exercise can be optimal even without dividends (deep ITM, high $$r$$); $$P > p$$.

{: .warning }
Parity holds with equality only for **European** options. For American options use the band — answer choices that apply $$c + Ke^{-rT} = p + S_0$$ to American puts are a deliberate trap.

## Ch 14 — Trading Strategies

Notation: $$K_1 < K_2 (< K_3)$$; premiums $$c_i, p_i$$; net cost = debit paid (or credit received). Max profit/loss below are at expiration, net of premiums.

| Strategy | Construction | Max profit | Max loss | Breakeven(s) |
|---|---|---|---|---|
| Bull call spread | Long call $$K_1$$, short call $$K_2$$ | $$(K_2 - K_1) - \text{debit}$$ | debit | $$K_1 + \text{debit}$$ |
| Bear put spread | Long put $$K_2$$, short put $$K_1$$ | $$(K_2 - K_1) - \text{debit}$$ | debit | $$K_2 - \text{debit}$$ |
| Box spread | Bull call spread + bear put spread (same $$K_1, K_2$$) | payoff fixed at $$K_2 - K_1$$ | — | value $$= (K_2 - K_1)e^{-rT}$$ |
| Butterfly (calls) | Long $$K_1$$, short 2× $$K_2$$, long $$K_3$$ (usually $$K_2$$ midpoint) | $$(K_2 - K_1) - \text{debit}$$ | debit | $$K_1 + \text{debit}$$; $$K_3 - \text{debit}$$ |
| Straddle | Long call + long put, same $$K$$ | unlimited | total premium | $$K \pm \text{premium}$$ |
| Strangle | Long put $$K_1$$ + long call $$K_2$$ | unlimited | total premium | $$K_1 - \text{prem}$$; $$K_2 + \text{prem}$$ |
| Collar | Long stock + long put $$K_1$$ + short call $$K_2$$ | $$K_2 - S_0 - \text{net cost}$$ | $$S_0 - K_1 + \text{net cost}$$ | $$S_0 + \text{net cost}$$ |
| Strip | Long 1 call + 2 puts, same $$K$$ | large if $$S_T \downarrow$$ | total premium | bets on big move, down more likely |
| Strap | Long 2 calls + 1 put, same $$K$$ | unlimited if $$S_T \uparrow$$ | total premium | bets on big move, up more likely |

Box spread payoff is riskless:

$$\text{Payoff} = K_2 - K_1 \qquad \text{Value today} = (K_2 - K_1)e^{-rT}$$

*Trap:* the riskless box argument requires **European** options; with American options early exercise can break it. For spreads, always net the two premiums before computing breakevens.

## Ch 15 — Exotic Options

Gap call (pays based on $$K_1$$, triggered by $$K_2$$):

$$\text{Payoff} = S_T - K_1 \text{ if } S_T > K_2, \text{ else } 0$$

(gap put: $$K_1 - S_T$$ if $$S_T < K_2$$). Payoff can be negative if $$K_1 > K_2$$.

Binary options:

$$\text{Cash-or-nothing call: pays } Q \text{ if } S_T > K \qquad \text{Asset-or-nothing call: pays } S_T \text{ if } S_T > K$$

Note: vanilla call = asset-or-nothing call − cash-or-nothing call with $$Q = K$$.

Lookbacks ($$S_{\min}, S_{\max}$$ = extremes over the option's life):

$$\text{Floating lookback call: } S_T - S_{\min} \qquad \text{Floating lookback put: } S_{\max} - S_T$$

$$\text{Fixed lookback call: } \max(S_{\max} - K, 0) \qquad \text{Fixed lookback put: } \max(K - S_{\min}, 0)$$

Asian options ($$S_{\text{avg}}$$ = average price over the life):

$$\text{Average price call: } \max(S_{\text{avg}} - K, 0) \qquad \text{Average strike call: } \max(S_T - S_{\text{avg}}, 0)$$

(puts symmetric). Average price options are cheaper than vanillas (averaging lowers volatility).

Exchange option (swap asset 2 for asset 1):

$$\text{Payoff} = \max(S_1 - S_2, 0)$$

Chooser (at time $$t_1$$ choose call or put, both with strike $$K$$, maturity $$T$$): by parity at $$t_1$$,

$$\text{Chooser} = c(K, T) + p\big(Ke^{-r(T - t_1)},\, t_1\big)$$

i.e., a call to $$T$$ plus a put maturing at $$t_1$$ with strike $$Ke^{-r(T-t_1)}$$ (non-dividend case).

Barrier parity:

$$\text{knock-in} + \text{knock-out} = \text{vanilla}$$

for the same type, strike, maturity, and barrier (e.g., up-and-in call + up-and-out call = vanilla call). *Trap:* this is the fastest way to price the missing barrier option — don't recompute from scratch.

## Ch 16 — Properties of Interest Rates

Compounding conversions ($$r_m$$ = rate with $$m$$ compounding periods/year, $$r_c$$ = continuous equivalent):

$$r_c = m\ln\!\left(1 + \frac{r_m}{m}\right) \qquad r_m = m\left(e^{r_c/m} - 1\right)$$

Frequency to frequency ($$m_1 \to m_2$$):

$$\left(1 + \frac{r_1}{m_1}\right)^{m_1} = \left(1 + \frac{r_2}{m_2}\right)^{m_2}$$

Bond price from zero rates (continuous):

$$P = \sum_i c_i e^{-z_i t_i} + 100\,e^{-z_n t_n}$$

where $$c_i$$ = cash coupon at time $$t_i$$, $$z_i$$ = zero (spot) rate for maturity $$t_i$$.

Par yield $$c$$ (semiannual, per $100 face): the coupon making price = 100:

$$\frac{c}{2}\sum_i d_i + 100\,d_n = 100 \quad \Rightarrow \quad c = \frac{2\,(100 - 100\,d_n)}{\sum_i d_i}$$

where $$d_i = e^{-z_i t_i}$$ = discount factor.

Forward rate between $$T_1$$ and $$T_2$$ (continuous):

$$R_F = \frac{R_2 T_2 - R_1 T_1}{T_2 - T_1}$$

Discrete version:

$$(1 + R_2)^{T_2} = (1 + R_1)^{T_1}(1 + R_F)^{T_2 - T_1}$$

where $$R_1, R_2$$ = zero rates to $$T_1, T_2$$.

FRA value, receive fixed $$R_K$$ / pay floating on notional $$L$$:

$$V = L\,(R_K - R_F)(T_2 - T_1)\,e^{-R_2 T_2}$$

(pay-fixed: flip the sign, $$V = L(R_F - R_K)(T_2 - T_1)e^{-R_2 T_2}$$). $$R_K, R_F$$ here are expressed with compounding matching $$T_2 - T_1$$.

*Trap:* the FRA payoff is determined at $$T_1$$ but the rate applies over $$[T_1, T_2]$$; when settled at $$T_1$$, the payment is the $$T_2$$ amount **discounted from $$T_2$$ to $$T_1$$ at the realized floating rate**. Valuation shortcut: assume the forward rate is realized, then discount.

## Ch 17 — Corporate Bonds

Expected loss on a bond:

$$\text{EL} = \text{PD} \times (1 - \text{RR}) \times \text{Exposure}$$

where PD = probability of default, RR = recovery rate (recovery as % of exposure), and $$\text{LGD} = 1 - \text{RR}$$.

Credit spread approximation (per year):

$$\text{Spread} \approx \text{PD} \times \text{LGD}$$

i.e., the extra yield compensates for the expected annual loss rate. *Trap:* this ignores risk premiums, taxes, and liquidity — actual spreads exceed PD × LGD; it's an approximation, not an identity.

Recovery rate = value recovered (price shortly after default, % of face) / face. Bond indenture rankings (secured > senior unsecured > subordinated) drive RR, not PD — PD is issuer-level, RR is issue-level.

## Ch 18 — Mortgages and Mortgage-Backed Securities

Level monthly payment on loan $$L$$, annual rate $$r$$, $$n$$ years:

$$PMT = L\,\frac{r/12}{1 - (1 + r/12)^{-12n}}$$

Each payment splits into interest = (r/12) × outstanding balance, and scheduled principal = PMT − interest.

Prepayment measures:

$$SMM = 1 - (1 - CPR)^{1/12}$$

where CPR = annual conditional prepayment rate, SMM = single monthly mortality. Monthly prepayment:

$$\text{Prepayment}_t = SMM \times (\text{Beginning balance}_t - \text{Scheduled principal}_t)$$

PSA benchmark: 100 PSA means

$$CPR = 0.2\% \times \min(\text{month}, 30) \quad \text{(ramps to 6\% at month 30, flat after)}$$

X PSA multiplies that CPR by X/100 (e.g., 150 PSA in month 20: CPR = 1.5 × 4% = 6%).

{: .warning }
Apply SMM to the balance **after** subtracting that month's scheduled principal, and convert CPR to SMM before using it monthly — applying CPR/12 directly is wrong.

## Ch 19 — Interest Rate Futures

Day-count conventions:

- Treasury bonds: actual/actual (in period)
- Corporate and municipal bonds: 30/360
- Money market (T-bills, etc.): actual/360

$$\text{Dirty (cash) price} = \text{Clean (quoted) price} + \text{Accrued interest}$$

$$\text{Accrued} = \text{Coupon} \times \frac{\text{days since last coupon}}{\text{days in coupon period}}$$

T-bill discount quote $$Q$$ (face 100, $$n$$ days):

$$\text{Cash price} = 100 - \frac{n}{360}\,Q$$

T-bond futures quote in 32nds: 95-16 = 95 + 16/32 = 95.50.

Invoice price on delivery:

$$\text{Invoice} = (\text{Settlement futures price} \times CF) + \text{Accrued interest}$$

where CF = conversion factor of the delivered bond. Cheapest-to-deliver minimizes:

$$\text{Quoted bond price} - (\text{Futures price} \times CF)$$

Eurodollar futures (quote $$Q = 100 - $$ rate):

$$\text{Contract value} = 10{,}000\,[100 - 0.25(100 - Q)]$$

One basis point change in $$Q$$ = $25 per contract. *Trap:* the 0.25 reflects the 3-month (quarter-year) deposit on $1 million notional.

Convexity adjustment (continuous, $$\sigma$$ = short-rate volatility):

$$\text{Forward rate} = \text{Futures rate} - \tfrac{1}{2}\sigma^2 T_1 T_2$$

where $$T_1$$ = futures maturity, $$T_2$$ = maturity of the underlying rate. The adjustment grows with maturity squared — futures rates exceed forward rates.

Duration-based hedge:

$$N^* = -\frac{P\,D_P}{V_F\,D_F}$$

where $$P$$ = portfolio value, $$D_P$$ = portfolio duration, $$V_F$$ = contract price (futures price × multiplier), $$D_F$$ = duration of the asset underlying the futures. Negative = short futures to hedge a long bond portfolio.

## Ch 20 — Swaps

Interest rate swap valued as bonds:

$$V_{\text{pay fixed}} = B_{fl} - B_{fix} \qquad V_{\text{receive fixed}} = B_{fix} - B_{fl}$$

where $$B_{fix}$$ = PV of fixed leg (coupons at swap rate + notional), $$B_{fl}$$ = value of floating leg. Floating bond value:

$$B_{fl} = (L + k^*)\,e^{-r^* t^*}$$

where $$L$$ = notional, $$k^*$$ = next (already-set) floating coupon, $$t^*$$ = time to next reset, $$r^*$$ = zero rate to $$t^*$$. The floating leg is worth par immediately after each reset.

{: .warning }
Include the notional on **both** legs when using the bond method (they cancel in net value but not leg by leg), and don't forget the already-fixed next floating coupon.

Swap as a portfolio of FRAs: assume forward rates are realized, compute each net exchange (fixed − floating forward) × notional × accrual, and discount each at the matching zero rate. Both methods give the same value.

Currency swap (receive domestic, pay foreign):

$$V = B_D - S_0 B_F$$

where $$B_D$$ = value of domestic-currency bond (in domestic currency), $$B_F$$ = value of foreign-currency bond (in foreign currency), $$S_0$$ = spot rate in domestic per foreign. Receiving foreign/paying domestic: $$V = S_0 B_F - B_D$$. Discount each leg at its **own** currency's rates.

Comparative advantage — total gain shared by all parties:

$$\text{Total gain} = \Delta_{\text{fixed}} - \Delta_{\text{floating}}$$

where $$\Delta_{\text{fixed}}$$ = difference between the two borrowers' fixed rates and $$\Delta_{\text{floating}}$$ = difference between their floating spreads. *Trap:* the gain is split among the two counterparties and any intermediary; subtract the bank's cut before allocating savings.
