---
title: "Book 3 Formulas"
parent: Formula Sheets
nav_order: 3
---

# Book 3 Formulas

Every testable formula in Financial Markets and Products, with definitions and the classic traps.

## Ch 1 — Banks

$$\text{NIM} = \frac{\text{Interest income} - \text{Interest expense}}{\text{Interest-earning assets}} \qquad \text{ROE} = \text{ROA} \times \frac{\text{Assets}}{\text{Equity}}$$

ROA = net income / assets; assets/equity is the leverage multiplier — it scales both ROE and risk. Loan losses hit earnings through the loss provision, not capital directly.

## Ch 2 — Insurance Companies and Pension Plans

All ratios are percentages of premiums earned.

$$\text{Loss ratio} = \frac{\text{Incurred losses (claims)}}{\text{Premiums}} \qquad \text{Expense ratio} = \frac{\text{Underwriting/selling expenses}}{\text{Premiums}}$$

$$\text{Combined ratio} = \text{Loss ratio} + \text{Expense ratio}$$

$$\text{Combined after dividends} = \text{Combined ratio} + \text{Policyholder dividend ratio}$$

$$\text{Operating ratio} = \text{Combined after dividends} - \text{Investment income ratio}$$

An operating ratio below 100% means overall profit even when the combined ratio exceeds 100%.

Breakeven (actuarially fair) premium — set PV of expected premiums equal to PV of expected payouts using mortality-table probabilities:

$$\sum_t P \cdot p(\text{alive at } t)\,e^{-rt} = \sum_t \text{Payout} \cdot p(\text{death in year } t)\,e^{-r t_d}$$

where $$P$$ = annual premium (paid only by survivors), $$r$$ = discount rate, $$t_d$$ = payout timing.

{: .warning }
Premiums are paid at the **start** of each year by survivors; death benefits are conventionally paid **mid-year** (or year-end if stated). Mixing up the timing is the classic error.

## Ch 3 — Fund Management

$$\text{NAV per share} = \frac{\text{Assets} - \text{Liabilities}}{\text{Shares outstanding}}$$

Open-end funds transact at NAV (set daily at 4 p.m.); closed-end funds trade at market prices, usually a discount to NAV; ETFs track NAV intraday via creation/redemption arbitrage.

Hedge fund "2 and 20":

$$\text{Fee} = 2\% \times \text{AUM} + 20\% \times \max(\text{Return} - \text{Hurdle},\, 0) \times \text{AUM}$$

Incentive fee applies only above the hurdle rate and only when NAV exceeds the high-water mark (prior peak). *Trap:* the 2% is charged regardless of performance; check whether the 20% is computed on return net of the management fee.

## Ch 4 — Introduction to Derivatives

Forward payoffs: long $$S_T - K$$, short $$K - S_T$$. Option payoffs:

$$\text{Long call: } \max(S_T - K,\, 0) \qquad \text{Long put: } \max(K - S_T,\, 0)$$

Shorts are the negatives. $$S_T$$ = price at maturity, $$K$$ = delivery/strike price.

$$\text{Profit} = \text{Payoff} - \text{FV(premium)}$$

*Trap:* the exam usually ignores future-valuing the premium — profit = payoff − premium paid (or + premium received) unless rates are emphasized.

## Ch 5 — Exchanges and OTC Markets

Bilateral netting: exposure to a counterparty with netting is $$\max\left(\sum_i V_i,\, 0\right)$$ versus $$\sum_i \max(V_i,\, 0)$$ without, where $$V_i$$ = value of contract $$i$$. The benefit grows with the number of offsetting contracts.

Margin (collateral) types:

- **Variation margin** — settles current exposure (daily mark-to-market changes).
- **Initial margin** — buffer against potential future exposure over the close-out period.
- **Haircut** — discount applied to non-cash collateral value.

## Ch 6 — Central Clearing

Novation: the CCP becomes buyer to every seller and seller to every buyer. Multilateral netting ratio idea: netted/gross exposure falls as more members and offsetting trades clear through one CCP; fragmenting products across CCPs erodes the benefit.

Default waterfall (order of loss absorption):

1. Defaulting member's initial margin
2. Defaulting member's default fund contribution
3. CCP equity ("skin in the game")
4. Surviving members' default fund contributions
5. Unfunded assessments on surviving members (recovery tools)

*Trap:* surviving members' initial margin is not mutualized — the default fund, not IM, absorbs others' losses.

## Ch 7 — Futures Markets

Positions are marked to market daily.

$$\text{Balance} < \text{Maintenance margin} \;\Rightarrow\; \text{margin call: top up to Initial margin}$$

{: .warning }
The variation margin call restores the balance to the **initial** margin, not the maintenance margin. Call size = initial margin − current balance.

Daily gain/loss = price change × contract size × number of contracts.

Open interest = total longs outstanding (= total shorts). New long vs. new short: OI +1; one new, one closing: OI unchanged; both closing: OI −1. Volume counts all trades; OI counts only open positions.

## Ch 8 — Using Futures for Hedging

$$b = S - F$$

$$S$$ = spot price of asset hedged, $$F$$ = futures price used. Strengthening basis helps a short hedger; weakening helps a long hedger. Effective price for a short hedger closing at time 2:

$$\text{Effective price} = F_1 + b_2 = S_2 + (F_1 - F_2)$$

Minimum-variance hedge ratio and contract count:

$$h^* = \rho\,\frac{\sigma_S}{\sigma_F} \qquad N^* = \frac{h^* Q_A}{Q_F}$$

$$\rho$$ = correlation of spot vs. futures price changes; $$\sigma_S, \sigma_F$$ = their standard deviations; $$Q_A$$ = units hedged; $$Q_F$$ = units per contract. Tailing the hedge (adjusts for daily settlement):

$$N^* = \frac{h^* V_A}{V_F}$$

$$V_A$$ = dollar value of position, $$V_F$$ = dollar value of one contract. Hedge effectiveness = $$\rho^2$$ = proportion of variance eliminated.

Stock index futures:

$$\text{Full hedge: } N = \beta\,\frac{P}{F} \qquad \text{Beta change: } N = (\beta^* - \beta)\,\frac{P}{F}$$

$$P$$ = portfolio value, $$F$$ = futures price × multiplier, $$\beta^*$$ = target beta. Positive $$N$$ = buy futures; negative = sell. *Trap:* $$F$$ is the contract's dollar value (e.g., index × $250), not the index level.

## Ch 9 — Foreign Exchange Markets

Covered interest parity, continuous and discrete:

$$F = S\,e^{(r - r_f)T} \qquad F = S\,\frac{(1 + r)^T}{(1 + r_f)^T}$$

$$S$$ = spot quoted as **domestic per unit of foreign**, $$r$$ = domestic rate, $$r_f$$ = foreign rate, $$T$$ = years.

{: .warning }
Check the quote direction first. With $$S$$ in domestic-per-foreign, the domestic rate goes on top; an inverted quote flips $$r$$ and $$r_f$$. The lower-rate currency trades at a forward premium.

Cross rates — chain so currencies cancel:

$$\frac{\text{JPY}}{\text{EUR}} = \frac{\text{JPY}}{\text{USD}} \times \frac{\text{USD}}{\text{EUR}}$$

*Trap:* with bid–ask quotes, the cross bid is the product giving the customer the worst price; multiply bid × bid only when both quotes chain in the same direction.

## Ch 10 — Pricing Financial Forwards and Futures

Cost-of-carry family ($$S_0$$ = spot, $$r$$ = continuous risk-free rate, $$T$$ = maturity):

$$F_0 = S_0 e^{rT} \quad \text{(no income)}$$

$$F_0 = (S_0 - I)e^{rT} \quad (I = \text{PV of known dollar income})$$

$$F_0 = S_0 e^{(r - q)T} \quad (q = \text{continuous yield; for FX, } q = r_f)$$

Value of an existing long forward with delivery price $$K$$:

$$f = (F_0 - K)e^{-rT}$$

(short: negate). At inception $$K = F_0$$, so $$f = 0$$. *Trap:* price vs. value — $$F_0$$ resets continuously in the market; $$f$$ is the locked-in contract's worth. Don't forget the discounting.

Forwards vs. futures: equal under deterministic rates. If the asset price is **positively** correlated with interest rates, futures price > forward price (daily gains reinvested at high rates); negative correlation reverses it.

## Ch 11 — Commodity Forwards and Futures

$$F_0 = (S_0 + U)e^{rT} \quad (U = \text{PV of storage costs})$$

$$F_0 = S_0 e^{(r + u - y)T} \quad (u = \text{storage cost rate},\; y = \text{convenience yield})$$

$$F_0 = S_0 e^{(r - \delta)T} \quad (\delta = \text{lease rate})$$

Storage costs act like negative income; convenience yield (benefit of physical holding) like positive income. Implied convenience yield from observed prices:

$$y = r + u - \frac{1}{T}\ln\frac{F_0}{S_0}$$

*Trap:* for consumption commodities only $$F_0 \le S_0 e^{(r+u)T}$$ holds — convenience yield closes the gap. Backwardation ($$F_0 < S_0$$) signals high convenience yield.

## Ch 12 — Options Markets

Intrinsic value: call $$\max(S_0 - K, 0)$$, put $$\max(K - S_0, 0)$$. Time value = option price − intrinsic value. Call moneyness: ITM if $$S > K$$, ATM if $$S = K$$, OTM if $$S < K$$ (puts reversed).

Naked writer margin (per share; × 100 per contract):

$$\text{Margin} = \max\big(\text{Premium} + 20\%\,S_0 - \text{OTM amount},\;\, \text{Premium} + 10\% \times \text{Underlying}\big)$$

OTM amount = amount out of the money (zero if ITM); "underlying" = $$S_0$$ for calls, $$K$$ for puts. *Trap:* subtract the OTM amount only in the 20% leg; never go below the 10% floor.

Stock split $$n$$-for-$$m$$: $$K_{\text{new}} = K \times m/n$$ (old/new), and each contract covers $$(n/m) \times 100$$ shares. *Trap:* terms adjust for splits and stock dividends, **not** cash dividends.

## Ch 13 — Properties of Options

Notation: $$c, p$$ European; $$C, P$$ American; $$D$$ = PV of dividends during the option's life.

Upper bounds: $$c \le S_0$$, $$C \le S_0$$, $$p \le Ke^{-rT}$$, $$P \le K$$.

Lower bounds (no dividends):

$$c \ge \max(S_0 - Ke^{-rT},\, 0) \qquad p \ge \max(Ke^{-rT} - S_0,\, 0)$$

With dividends:

$$c \ge \max(S_0 - D - Ke^{-rT},\, 0) \qquad p \ge \max(D + Ke^{-rT} - S_0,\, 0)$$

American: $$C \ge c$$, $$P \ge p$$, and worth at least intrinsic: $$C \ge \max(S_0 - K, 0)$$, $$P \ge \max(K - S_0, 0)$$.

Put–call parity (European), without and with dividends:

$$c + Ke^{-rT} = p + S_0 \qquad c + D + Ke^{-rT} = p + S_0$$

American band (with dividends; drop $$D$$ if none):

$$S_0 - D - K \le C - P \le S_0 - Ke^{-rT}$$

Early exercise: never optimal for an American call on a non-dividend stock ($$C = c$$); with dividends, only just before an ex-dividend date. American puts may be exercised early even without dividends (deep ITM, high $$r$$), so $$P > p$$.

{: .warning }
Parity is an equality only for **European** options. For American options use the band — applying $$c + Ke^{-rT} = p + S_0$$ to American puts is a deliberate trap.

## Ch 14 — Trading Strategies

Notation: $$K_1 < K_2 (< K_3)$$; debit/credit = net premium paid/received; results at expiration, net of premiums.

| Strategy | Construction | Max profit | Max loss | Breakeven(s) |
|---|---|---|---|---|
| Bull call spread | Long call $$K_1$$, short call $$K_2$$ | $$(K_2 - K_1) - \text{debit}$$ | debit | $$K_1 + \text{debit}$$ |
| Bear put spread | Long put $$K_2$$, short put $$K_1$$ | $$(K_2 - K_1) - \text{debit}$$ | debit | $$K_2 - \text{debit}$$ |
| Box spread | Bull call spread + bear put spread, same $$K_1, K_2$$ | riskless payoff $$K_2 - K_1$$ | — | value $$=(K_2 - K_1)e^{-rT}$$ |
| Butterfly (calls) | Long $$K_1$$, short 2 × $$K_2$$, long $$K_3$$ ($$K_2$$ midpoint) | $$(K_2 - K_1) - \text{debit}$$ | debit | $$K_1 + \text{debit}$$; $$K_3 - \text{debit}$$ |
| Straddle | Long call + long put, same $$K$$ | unlimited | total premium | $$K \pm \text{premium}$$ |
| Strangle | Long put $$K_1$$ + long call $$K_2$$ | unlimited | total premium | $$K_1 - \text{prem}$$; $$K_2 + \text{prem}$$ |
| Collar | Long stock + long put $$K_1$$ + short call $$K_2$$ | $$K_2 - S_0 - \text{net cost}$$ | $$S_0 - K_1 + \text{net cost}$$ | $$S_0 + \text{net cost}$$ |
| Strip | Long 1 call + 2 puts, same $$K$$ | large move, down weighted | total premium | $$K + \text{prem}$$; $$K - \text{prem}/2$$ |
| Strap | Long 2 calls + 1 put, same $$K$$ | large move, up weighted | total premium | $$K - \text{prem}$$; $$K + \text{prem}/2$$ |

Box spread is riskless:

$$\text{Payoff} = K_2 - K_1 \qquad \text{Value} = (K_2 - K_1)e^{-rT}$$

*Trap:* the box argument requires **European** options — American early exercise breaks it. Always net both premiums before computing breakevens.

## Ch 15 — Exotic Options

Gap call: pays $$S_T - K_1$$ if $$S_T > K_2$$, else 0 (gap put: $$K_1 - S_T$$ if $$S_T < K_2$$). Payoff can be negative if $$K_1 > K_2$$.

Binaries: cash-or-nothing call pays fixed $$Q$$ if $$S_T > K$$; asset-or-nothing call pays $$S_T$$ if $$S_T > K$$. Note: vanilla call = asset-or-nothing − cash-or-nothing with $$Q = K$$.

Lookbacks ($$S_{\min}, S_{\max}$$ = extremes over the life):

$$\text{Floating: call } S_T - S_{\min}, \text{ put } S_{\max} - S_T \qquad \text{Fixed: call } \max(S_{\max} - K, 0), \text{ put } \max(K - S_{\min}, 0)$$

Asians ($$S_{\text{avg}}$$ = average price over the life):

$$\text{Average price call: } \max(S_{\text{avg}} - K,\, 0) \qquad \text{Average strike call: } \max(S_T - S_{\text{avg}},\, 0)$$

(puts symmetric). Average price options are cheaper than vanillas — averaging lowers volatility.

Exchange option (swap asset 2 for asset 1): payoff $$\max(S_1 - S_2,\, 0)$$.

Chooser (choose call or put at $$t_1$$, both strike $$K$$, maturity $$T$$) — by parity at $$t_1$$:

$$\text{Chooser} = c(K, T) + p\big(Ke^{-r(T - t_1)},\, t_1\big)$$

a call to $$T$$ plus a put maturing at $$t_1$$ with strike $$Ke^{-r(T - t_1)}$$ (non-dividend case).

Barrier parity (same type, strike, maturity, barrier):

$$\text{knock-in} + \text{knock-out} = \text{vanilla}$$

*Trap:* this prices the missing barrier option instantly — don't recompute from scratch.

## Ch 16 — Properties of Interest Rates

Compounding conversions ($$r_m$$ = rate compounded $$m$$ times/year, $$r_c$$ = continuous equivalent):

$$r_c = m\ln\!\left(1 + \frac{r_m}{m}\right) \qquad r_m = m\left(e^{r_c/m} - 1\right) \qquad \left(1 + \frac{r_1}{m_1}\right)^{m_1} = \left(1 + \frac{r_2}{m_2}\right)^{m_2}$$

Bond price from zero rates: $$P = \sum_i c_i e^{-z_i t_i} + 100\,e^{-z_n t_n}$$, where $$c_i$$ = coupon at $$t_i$$, $$z_i$$ = zero rate.

Par yield (semiannual, face 100; $$d_i = e^{-z_i t_i}$$ = discount factors): coupon $$c$$ making price = 100:

$$c = \frac{2\,(100 - 100\,d_n)}{\sum_i d_i}$$

Forward rate over $$[T_1, T_2]$$ — continuous and discrete ($$R_1, R_2$$ = zero rates):

$$R_F = \frac{R_2 T_2 - R_1 T_1}{T_2 - T_1} \qquad (1 + R_2)^{T_2} = (1 + R_1)^{T_1}(1 + R_F)^{T_2 - T_1}$$

FRA value on notional $$L$$, receive fixed $$R_K$$:

$$V = L\,(R_K - R_F)(T_2 - T_1)\,e^{-R_2 T_2}$$

Pay-fixed flips the sign: $$V = L(R_F - R_K)(T_2 - T_1)e^{-R_2 T_2}$$. $$R_K, R_F$$ use compounding matching $$T_2 - T_1$$.

*Trap:* the FRA payoff is fixed at $$T_1$$ but applies over $$[T_1, T_2]$$; when settled at $$T_1$$ the payment is the $$T_2$$ amount discounted from $$T_2$$ to $$T_1$$ at the realized floating rate. Valuation shortcut: assume the forward rate is realized, then discount.

## Ch 17 — Corporate Bonds

$$\text{EL} = \text{PD} \times (1 - \text{RR}) \times \text{Exposure} \qquad \text{Spread} \approx \text{PD} \times \text{LGD}$$

PD = probability of default; RR = recovery rate (price shortly after default as % of face); LGD = 1 − RR. *Trap:* the spread relation is an approximation — actual spreads exceed PD × LGD because of risk premiums, taxes, and liquidity.

Seniority (secured > senior unsecured > subordinated) drives RR, which is issue-level; PD is issuer-level.

## Ch 18 — Mortgages and Mortgage-Backed Securities

Level monthly payment on loan $$L$$, annual rate $$r$$, $$n$$ years:

$$PMT = L\,\frac{r/12}{1 - (1 + r/12)^{-12n}}$$

Monthly interest = $$(r/12) \times$$ balance; scheduled principal = PMT − interest.

Prepayments (CPR = annual conditional prepayment rate, SMM = single monthly mortality):

$$SMM = 1 - (1 - CPR)^{1/12} \qquad \text{Prepayment}_t = SMM \times (\text{Balance}_t - \text{Scheduled principal}_t)$$

PSA benchmark — 100 PSA:

$$CPR = 0.2\% \times \min(\text{month},\, 30) \quad \text{(6\% cap from month 30)}$$

X PSA multiplies that CPR by X/100 (150 PSA, month 20: CPR = 1.5 × 4% = 6%).

{: .warning }
Convert CPR to SMM before applying it monthly (CPR/12 is wrong), and apply SMM to the balance **after** subtracting that month's scheduled principal.

## Ch 19 — Interest Rate Futures

Day counts: Treasury bonds actual/actual (in period); corporates/munis 30/360; money market actual/360.

$$\text{Dirty (cash) price} = \text{Clean (quoted) price} + \text{Accrued interest}, \quad \text{Accrued} = \text{Coupon} \times \frac{\text{days since last coupon}}{\text{days in period}}$$

T-bill discount quote $$Q$$ (face 100, $$n$$ days to maturity):

$$\text{Cash price} = 100 - \frac{n}{360}\,Q$$

T-bond futures quote in 32nds: 95-16 = 95 + 16/32 = 95.50. Delivery invoice:

$$\text{Invoice} = (\text{Settlement futures price} \times CF) + \text{Accrued interest}$$

CF = conversion factor. Cheapest-to-deliver minimizes $$\text{Quoted bond price} - (\text{Futures price} \times CF)$$.

Eurodollar futures (quote $$Q = 100 -$$ rate):

$$\text{Contract value} = 10{,}000\,[100 - 0.25(100 - Q)]$$

One basis point in $$Q$$ = $25 per contract (3-month rate on $1 million notional).

Convexity adjustment ($$\sigma$$ = short-rate volatility, $$T_1$$ = futures maturity, $$T_2$$ = maturity of the underlying rate):

$$\text{Forward rate} = \text{Futures rate} - \tfrac{1}{2}\sigma^2 T_1 T_2$$

Futures rates exceed forward rates; the gap grows with maturity squared.

Duration-based hedge:

$$N^* = -\frac{P\,D_P}{V_F\,D_F}$$

$$P$$ = portfolio value, $$D_P$$ = its duration, $$V_F$$ = futures contract price (price × multiplier), $$D_F$$ = duration of the underlying. Negative = short futures to hedge a long bond portfolio.

## Ch 20 — Swaps

Interest rate swap as bonds:

$$V_{\text{pay fixed}} = B_{fl} - B_{fix} \qquad V_{\text{receive fixed}} = B_{fix} - B_{fl}$$

$$B_{fix}$$ = PV of fixed coupons + notional; floating leg:

$$B_{fl} = (L + k^*)\,e^{-r^* t^*}$$

$$L$$ = notional, $$k^*$$ = next (already-set) floating coupon, $$t^*$$ = time to next reset, $$r^*$$ = zero rate to $$t^*$$. The floating leg is worth par immediately after each reset.

{: .warning }
Include the notional on **both** legs in the bond method, and don't drop the already-fixed next floating coupon.

Swap as FRAs: assume forward rates are realized, compute each net exchange (fixed − floating forward) × notional × accrual fraction, discount each at the matching zero rate. Same value as the bond method.

Currency swap (receive domestic, pay foreign):

$$V = B_D - S_0 B_F$$

$$B_D$$ = domestic-currency bond value (domestic units), $$B_F$$ = foreign-currency bond value (foreign units), $$S_0$$ = spot in domestic per foreign. Receive-foreign: $$V = S_0 B_F - B_D$$. Discount each leg at its own currency's rates.

Comparative advantage:

$$\text{Total gain} = \Delta_{\text{fixed}} - \Delta_{\text{floating}}$$

$$\Delta_{\text{fixed}}$$ = difference between the two borrowers' fixed rates; $$\Delta_{\text{floating}}$$ = difference between their floating spreads. *Trap:* the gain is shared by both counterparties and any intermediary — subtract the bank's cut before allocating savings.
