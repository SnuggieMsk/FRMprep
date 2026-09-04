/* FRM Study Hub — hover-to-learn glossary
   Wraps key exam jargon in rendered text with a tooltip that explains the term
   in plain English on hover (desktop) or tap (mobile). No dependencies. */
(function () {
  "use strict";

  // Curated, plain-English definitions. Keep them short. Multi-word/distinctive
  // terms only (avoid common English words to prevent noise).
  var TERMS = {
    // --- rates, bonds & the yield curve (the curvature/butterfly family) ---
    "dv01": "Dollar Value of an '01: the dollar change in a bond/portfolio value for a 1 basis-point (0.01%) move in yield. A hedging workhorse.",
    "zero-dv01": "A position built so its net DV01 = 0 — gains on one leg offset losses on the other for a small PARALLEL rate move. It is not protected if the curve changes shape.",
    "basis point": "One hundredth of a percent (0.01%). Rates and spreads are quoted in 'bps': 0.25% = 25 bps.",
    "duration": "How sensitive a bond's price is to interest rates: roughly the % price fall for a 1% rise in yield. Higher duration = more rate risk.",
    "modified duration": "Duration adjusted for the bond's yield; gives the % price change for a 1% yield move.",
    "macaulay duration": "The weighted-average time (in years) until you receive a bond's cash flows.",
    "effective duration": "Duration computed by re-pricing the bond up and down — used when cash flows can change (e.g. callable bonds, MBS).",
    "convexity": "The curve in the price–yield relationship. Duration is the straight-line estimate; convexity is the correction that makes price fall less / rise more than duration predicts.",
    "barbell": "A bond portfolio concentrated in very short AND very long maturities (the 'wings'), with little in the middle.",
    "bullet": "A bond portfolio concentrated around a single intermediate maturity (the 'belly').",
    "belly": "The middle of the yield curve (e.g. the 10-year area) — the center maturities.",
    "wings": "The short and long ends of the yield curve (e.g. 2-year and 30-year) — the outer maturities.",
    "curvature": "How bent the yield curve is — the relationship between the middle (belly) and the two ends (wings). A curvature trade bets on the belly moving relative to the wings.",
    "butterfly": "A curve trade (or option strategy) involving three points: long the wings + short the belly, or vice-versa. Profits from a change in curvature.",
    "parallel shift": "All yields move up or down by the same amount, keeping the curve's shape. DV01/duration hedges protect against this.",
    "non-parallel shift": "Yields at different maturities move by different amounts, changing the curve's shape (steepening, flattening, or curvature) — duration alone misses this.",
    "steepening": "Long-term yields rise relative to short-term yields — the curve gets steeper.",
    "flattening": "Short-term yields rise relative to long-term yields — the curve flattens.",
    "key rate": "A specific maturity point on the curve (e.g. 2y, 5y, 10y) whose yield is shifted on its own to measure that point's risk.",
    "key rate duration": "Price sensitivity to a shift in ONE point of the curve, holding the others fixed. The key-rate durations sum to (roughly) the total effective duration.",
    "kr01": "Like DV01 but for a single key-rate: the dollar change for a 1 bp move at one maturity only.",
    "yield curve": "A graph of interest rate (yield) versus maturity. Usually upward-sloping; can be flat or inverted.",
    "term structure": "Another name for the yield curve — how rates vary with maturity.",
    "spot rate": "The interest rate today for a single payment at one future date (zero-coupon rate).",
    "forward rate": "An interest rate agreed today for borrowing/lending over a future period.",
    "par rate": "The coupon rate that makes a bond price exactly equal its face value (par).",
    "yield to maturity": "The single discount rate that makes a bond's future cash flows equal its current price; the bond's internal rate of return if held to maturity.",
    "accrued interest": "Coupon interest earned since the last payment date that the buyer pays the seller.",
    "clean price": "A bond's quoted price excluding accrued interest.",
    "dirty price": "The actual cash price paid = clean price + accrued interest.",
    "cheapest-to-deliver": "In a bond futures contract, the bond the short can deliver most cheaply — it sets the futures price.",
    "conversion factor": "An adjustment that standardizes deliverable bonds of different coupons/maturities in a futures contract.",
    "bootstrapping": "Building the zero/spot rate curve step-by-step from the prices of coupon bonds.",

    // --- options & derivatives ---
    "call option": "The right (not obligation) to BUY an asset at a set strike price. Gains when the price rises.",
    "put option": "The right (not obligation) to SELL an asset at a set strike price. Gains when the price falls.",
    "strike": "The fixed price at which an option lets you buy (call) or sell (put) the underlying.",
    "intrinsic value": "What an option is worth if exercised right now (never below zero).",
    "time value": "The part of an option's price beyond intrinsic value — paying for the chance it gains before expiry.",
    "moneyness": "Where the strike sits versus the current price: in-, at-, or out-of-the-money.",
    "put-call parity": "A fixed relationship linking a call, a put, the stock and a bond on the same strike: c + PV(K) = p + S. Know three, price the fourth.",
    "delta": "How much an option's price moves for a $1 move in the underlying. Calls 0→1, puts −1→0.",
    "gamma": "How fast delta itself changes as the underlying moves. Highest for at-the-money options near expiry.",
    "vega": "How much an option's price moves when volatility changes by 1%.",
    "theta": "Time decay — how much an option loses in value as one day passes, all else equal.",
    "rho": "How much an option's price moves when the interest rate changes by 1%.",
    "delta-neutral": "A position whose deltas net to zero, so small moves in the underlying don't change its value — but gamma can still hurt it.",
    "implied volatility": "The volatility number that, put into a pricing model, reproduces an option's market price. The market's forecast of future swings.",
    "straddle": "Buying a call and a put at the same strike — profits from a big move in either direction.",
    "covered call": "Owning the stock and selling a call against it — earns premium but caps the upside.",
    "protective put": "Owning the stock and buying a put — insures the downside.",
    "collar": "Own the stock, buy a put, sell a call — boxes returns into a band (floored downside, capped upside).",
    "binomial tree": "A model that values options by letting the price move up or down step-by-step to expiry, then discounting back.",
    "risk-neutral": "A pricing trick: value derivatives as if everyone were indifferent to risk, discounting expected payoffs at the risk-free rate. Not a real-world probability.",
    "black-scholes-merton": "The classic closed-form formula for pricing European options assuming lognormal prices and constant volatility.",
    "exotic option": "Any option more complex than a plain (vanilla) call/put — e.g. barrier, Asian, lookback, digital.",
    "forward": "A private contract to buy/sell an asset at a set price on a future date (not exchange-traded).",
    "futures": "An exchange-traded, standardized forward, settled daily through margin (marked to market).",
    "swap": "An agreement to exchange cash-flow streams — e.g. fixed interest for floating.",
    "notional": "The reference principal used to size a derivative's payments; usually not itself exchanged.",
    "margin": "Collateral posted to cover potential losses on a futures/derivatives position.",
    "mark to market": "Re-valuing a position at current market prices (daily for futures), settling the gain/loss.",
    "contango": "Futures price above the expected/spot price — the curve slopes up with maturity.",
    "backwardation": "Futures price below the spot price — the curve slopes down with maturity.",
    "cost of carry": "The net cost of holding an asset to a future date (financing + storage − income/yield); it links spot and forward prices.",
    "convenience yield": "The hidden benefit of physically holding a commodity (e.g. keeping a factory running) — it lowers the forward price.",
    "covered interest parity": "FX rule: the forward exchange rate must offset the interest-rate difference between two currencies, or arbitrage exists.",

    // --- risk measures, credit & vol ---
    "var": "Value at Risk: the loss that won't be exceeded over a set horizon at a given confidence (e.g. 99%). A quantile, not the worst case.",
    "value at risk": "The loss that won't be exceeded over a set horizon at a given confidence level (e.g. 1-day 99% VaR).",
    "expected shortfall": "The AVERAGE loss in the tail beyond VaR. Always ≥ VaR; it is 'coherent' where VaR isn't.",
    "coherent risk measure": "A risk measure obeying four sensible rules (incl. subadditivity — diversification never increases it). ES qualifies; VaR doesn't always.",
    "subadditivity": "The risk of a combined portfolio should be ≤ the sum of its parts' risks (diversification helps). VaR can violate this.",
    "backtesting": "Checking a VaR model by counting how often real losses exceeded the predicted VaR.",
    "stress testing": "Estimating losses under severe but plausible hypothetical scenarios — complements VaR/ES.",
    "ewma": "Exponentially Weighted Moving Average: a volatility estimate that weights recent returns more and older ones less.",
    "garch": "A volatility model where today's variance depends on a long-run level, yesterday's shock, and yesterday's variance — captures volatility clustering.",
    "volatility": "How much returns swing around their average — the standard deviation of returns.",
    "expected loss": "The average loss you anticipate: PD × LGD × EAD. Covered by pricing/provisions, not capital.",
    "unexpected loss": "Loss beyond the expected level (the swing around it) — this is what capital is held against.",
    "economic capital": "The capital a firm sets aside to absorb unexpected losses up to a chosen confidence level.",
    "probability of default": "PD: the chance a borrower fails to pay over a given period.",
    "loss given default": "LGD: the fraction of exposure you actually lose if a borrower defaults (= 1 − recovery rate).",
    "exposure at default": "EAD: the amount owed to you at the moment a borrower defaults.",
    "recovery rate": "The fraction of money recovered after a default (so LGD = 1 − recovery rate).",
    "credit var": "The capital buffer for credit losses: a high-percentile loss minus the expected loss.",
    "merton model": "Treats a firm's equity as a call option on its assets; the firm defaults if asset value falls below its debt.",
    "transition matrix": "A table of probabilities that a credit rating moves from one grade to another over a period.",
    "wrong-way risk": "When your exposure to a counterparty grows just as that counterparty becomes more likely to default.",
    "operational risk": "Risk of loss from failed people, processes, systems, or external events (fraud, outages, etc.) — not market or credit risk.",

    // --- quant / statistics ---
    "standard deviation": "A measure of spread: the typical distance of values from their average.",
    "covariance": "Whether two variables move together (positive) or oppositely (negative); units depend on the variables.",
    "correlation": "Covariance rescaled to between −1 and +1 — a unit-free measure of how two variables move together.",
    "skewness": "Asymmetry of a distribution. Negative skew = a long left (loss) tail.",
    "kurtosis": "How fat the tails are. Above 3 (excess > 0) means more extreme outcomes than the normal — 'fat tails'.",
    "leptokurtic": "Having fatter tails and a sharper peak than the normal distribution (kurtosis > 3).",
    "lognormal": "A distribution for values that can't go negative (like prices); its logarithm is normally distributed.",
    "bayes": "A rule for updating a probability after new evidence: combine the prior with how likely the evidence is.",
    "hypothesis test": "A procedure to decide if data contradict a default claim (the null hypothesis).",
    "null hypothesis": "The default assumption a test tries to disprove (e.g. 'the coefficient is zero').",
    "p-value": "The probability of seeing data this extreme if the null hypothesis were true. Small p → reject the null.",
    "type i error": "Rejecting a true null hypothesis — a false positive.",
    "type ii error": "Failing to reject a false null hypothesis — a false negative.",
    "confidence interval": "A range that, with a stated confidence (e.g. 95%), should contain the true value.",
    "r-squared": "The fraction of the dependent variable's variation explained by a regression (0 to 1).",
    "heteroskedasticity": "When the spread of regression errors isn't constant across observations — it messes up standard errors.",
    "multicollinearity": "When regression predictors are highly correlated with each other, making their individual effects hard to pin down.",
    "autocorrelation": "When a series is correlated with its own past values.",
    "stationary": "A time series whose statistical properties (mean, variance) don't change over time — needed for reliable forecasting.",
    "unit root": "A feature of a non-stationary series (like a random walk); shocks never fade. Tested with Dickey-Fuller.",
    "random walk": "A series where the next value = current value + random shock; it wanders with no fixed mean.",
    "mean reversion": "The tendency of a series to drift back toward a long-run average over time.",
    "monte carlo": "Estimating outcomes by simulating thousands of random scenarios and averaging the results.",
    "central limit theorem": "The average of many independent samples is approximately normally distributed, whatever the original distribution.",

    // --- portfolio & foundations ---
    "capm": "Capital Asset Pricing Model: expected return = risk-free rate + beta × (market return − risk-free). Only systematic risk is rewarded.",
    "beta": "How much an asset moves with the overall market. Beta 1 = moves with the market; >1 = more volatile.",
    "alpha": "Return above what CAPM predicts for the risk taken — the 'skill' component.",
    "sharpe ratio": "Excess return per unit of TOTAL risk (standard deviation). Higher = better risk-adjusted return.",
    "treynor ratio": "Excess return per unit of MARKET risk (beta) — uses beta instead of total volatility.",
    "jensen's alpha": "A portfolio's return minus the CAPM-predicted return — its alpha.",
    "information ratio": "Active return over a benchmark divided by tracking error — reward per unit of active risk.",
    "sortino ratio": "Like the Sharpe ratio but only penalizes downside (bad) volatility.",
    "tracking error": "How much a portfolio's returns deviate from its benchmark.",
    "raroc": "Risk-Adjusted Return on Capital: profit measured against the economic capital at risk.",
    "efficient frontier": "The set of portfolios giving the highest return for each level of risk.",
    "systematic risk": "Market-wide risk that can't be diversified away (rewarded with return).",
    "idiosyncratic risk": "Company-specific risk that diversification can remove (not rewarded).",
    "diversification": "Combining imperfectly-correlated assets so company-specific risks average out, lowering total risk.",
    "moral hazard": "When being protected (insured/bailed out) makes someone take more risk.",
    "adverse selection": "When the riskiest parties are the most eager to trade/insure because they know something you don't.",
    "liquidity risk": "Risk of not being able to raise cash (funding) or sell an asset without a big price drop (market liquidity).",
    "basis risk": "Risk that a hedge isn't perfect because the hedged item and the hedging instrument don't move exactly together.",
    "basis": "Spot price minus futures price; it converges toward zero as the contract nears expiry.",
    "netting": "Offsetting what two parties owe each other so only the net amount changes hands — cuts exposure.",
    "central clearing": "Routing trades through a central counterparty (CCP) that guarantees them, reducing counterparty risk.",
    "enterprise risk management": "Managing all of a firm's risks together, firm-wide, rather than in separate silos."
  };

  // longest terms first so multi-word terms win over their substrings
  var KEYS = Object.keys(TERMS).sort(function (a, b) { return b.length - a.length; });
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  // \b boundaries (broad browser support) + optional trailing "s" for plurals.
  var RE = new RegExp("\\b(" + KEYS.map(escRe).join("|") + ")s?\\b", "i");

  var SKIP = { CODE: 1, PRE: 1, A: 1, SCRIPT: 1, STYLE: 1, BUTTON: 1, SUMMARY: 1, TEXTAREA: 1, INPUT: 1 };
  function blocked(node) {
    for (var p = node.parentNode; p && p.nodeType === 1; p = p.parentNode) {
      if (SKIP[p.tagName]) return true;
      var c = p.className;
      if (typeof c === "string" && (/\bkatex\b/.test(c) || /\bfrm-term\b/.test(c) || /\bfrm-tip\b/.test(c) || /\bq-letter\b/.test(c) || /\bq-num\b/.test(c))) return true;
    }
    return false;
  }
  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }

  function annotate(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) { if (n.nodeValue && /\S/.test(n.nodeValue) && !blocked(n)) nodes.push(n); }
    var used = {}; // wrap first occurrence of each term per root, to keep it clean
    nodes.forEach(function (node) {
      var text = node.nodeValue, out = "", rest = text, changed = false, guard = 0;
      while (guard++ < 50) {
        var m = RE.exec(rest);
        if (!m) break;
        var term = m[1], key = term.toLowerCase();
        if (used[key]) { // already taught on this page — leave plain, keep scanning after it
          out += esc(rest.slice(0, m.index + term.length));
          rest = rest.slice(m.index + term.length);
          continue;
        }
        used[key] = 1; changed = true;
        out += esc(rest.slice(0, m.index));
        out += '<span class="frm-term" tabindex="0" role="button" aria-label="' + esc(term) + ': definition">'
          + esc(term) + '<span class="frm-tip" role="tooltip"><b>' + esc(term) + '</b>' + esc(TERMS[key]) + '</span></span>';
        rest = rest.slice(m.index + term.length);
      }
      if (changed) {
        out += esc(rest);
        var span = document.createElement("span");
        span.innerHTML = out;
        node.parentNode.replaceChild(span, node);
      }
    });
  }

  // tap support: toggle tooltip on click (desktop hover handled by CSS)
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest(".frm-term");
    document.querySelectorAll(".frm-term.open").forEach(function (el) { if (el !== t) el.classList.remove("open"); });
    if (t) { e.preventDefault(); t.classList.toggle("open"); }
  });

  window.FRMGlossary = { annotate: annotate, define: function (k) { return TERMS[(k || "").toLowerCase()]; }, count: KEYS.length };
})();
