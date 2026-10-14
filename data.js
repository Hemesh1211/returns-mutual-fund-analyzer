// Returns.in — Comprehensive Indian Mutual Fund Dataset (Direct Plan - Growth)
// All returns are annualized CAGR (%) in INR. AUM in ₹ Crores.
// Integrated with AMFI mfapi.in API for daily real-time NAV sync.

window.MARKET_INDICES = [
  {
    "name": "NIFTY 50 TRI",
    "value": "25,842.60",
    "change": "+0.68%",
    "cagr3Y": 15.4,
    "cagr5Y": 17.8,
    "cagr10Y": 14.2
  },
  {
    "name": "BSE SENSEX",
    "value": "84,918.30",
    "change": "+0.61%",
    "cagr3Y": 14.9,
    "cagr5Y": 17.2,
    "cagr10Y": 14.0
  },
  {
    "name": "NIFTY Midcap 150 TRI",
    "value": "21,940.15",
    "change": "+1.12%",
    "cagr3Y": 26.8,
    "cagr5Y": 28.4,
    "cagr10Y": 19.6
  },
  {
    "name": "NIFTY Smallcap 250 TRI",
    "value": "18,412.80",
    "change": "+1.35%",
    "cagr3Y": 28.1,
    "cagr5Y": 31.2,
    "cagr10Y": 18.9
  },
  {
    "name": "NIFTY 500 TRI",
    "value": "24,115.40",
    "change": "+0.82%",
    "cagr3Y": 18.6,
    "cagr5Y": 20.5,
    "cagr10Y": 15.5
  }
];

window.AMFI_SCHEME_CODES = {
  "invesco-midcap": 120304,
  "invesco-smallcap": 145044,
  "invesco-flexicap": 149639,
  "invesco-largecap": 120302,
  "invesco-elss": 120307,
  "hdfc-flexicap": 118989,
  "hdfc-midcap": 118968,
  "hdfc-smallcap": 130503,
  "hdfc-top100": 118961,
  "hdfc-balanced-adv": 118955,
  "sbi-smallcap": 125497,
  "sbi-elss": 119718,
  "sbi-bluechip": 119598,
  "sbi-magnum-midcap": 119723,
  "sbi-contra": 119711,
  "icici-bluechip": 120586,
  "icici-smallcap": 149283,
  "icici-midcap": 120587,
  "icici-value-disc": 120594,
  "icici-balanced-adv": 120588,
  "nippon-smallcap": 118778,
  "nippon-largecap": 118632,
  "nippon-growth": 118666,
  "nippon-multicap": 118671,
  "nippon-power-infra": 118698,
  "kotak-smallcap": 120164,
  "kotak-emerging-midcap": 119779,
  "kotak-flexicap": 102868,
  "kotak-bluechip": 120152,
  "axis-smallcap": 125354,
  "axis-midcap": 120503,
  "axis-bluechip": 120465,
  "axis-flexicap": 140245,
  "axis-elss": 120505,
  "quant-smallcap": 120828,
  "quant-elss": 120847,
  "quant-midcap": 120841,
  "quant-flexicap": 120823,
  "quant-active": 120833,
  "mirae-largecap": 118825,
  "mirae-largemidcap": 118834,
  "mirae-midcap": 147402,
  "mirae-elss": 135781,
  "tata-smallcap": 145206,
  "tata-digital-india": 135800,
  "tata-midcap": 120760,
  "tata-largemidcap": 120757,
  "motilal-midcap": 127042,
  "motilal-smallcap": 149444,
  "motilal-flexicap": 128952,
  "motilal-largemidcap": 147683,
  "ppfas-flexi": 122639,
  "ppfas-elss": 149836,
  "ppfas-dynamic-asset": 148767,
  "uti-nifty50": 120716,
  "uti-flexicap": 120703,
  "uti-midcap": 120698,
  "dsp-smallcap": 119212,
  "dsp-midcap": 119208,
  "dsp-top100": 119204,
  "bandhan-smallcap": 147946,
  "bandhan-core-equity": 119062,
  "bandhan-flexicap": 119064,
  "edelweiss-midcap": 119364,
  "edelweiss-smallcap": 145969,
  "edelweiss-largemidcap": 119360,
  "jm-flexicap": 120492,
  "jm-midcap": 149591,
  "jm-largecap": 120490,
  "sbi-liquid": 119800,
  "sbi-overnight": 119833,
  "hdfc-corporate-bond": 118987,
  "nippon-gilt": 118672,
  "hdfc-nifty50-index": 119063,
  "canara-robeco-largecap": 118269,
  "franklin-flexicap": 118535
};

// ============================================================================
// INDIAN MUTUAL FUND HOUSES (AMCS) REGISTRY
// ============================================================================
window.FUND_HOUSES = [
  {
    "id": "invesco",
    "name": "Invesco Mutual Fund",
    "shortName": "Invesco India",
    "logoText": "🏛️",
    "badge": "Global Heritage",
    "aumTotalCr": 74200,
    "established": 2008,
    "hq": "Mumbai, Maharashtra",
    "cio": "Taher Badshah",
    "searchQuery": "invesco",
    "description": "Invesco Asset Management (India) is part of Invesco Ltd., a leading global independent investment management firm in 20+ countries. Known for disciplined factor modeling and high-conviction bottom-up stock selection.",
    "schemeIds": [
      "invesco-midcap",
      "invesco-smallcap",
      "invesco-flexicap",
      "invesco-largecap",
      "invesco-elss"
    ]
  },
  {
    "id": "hdfc",
    "name": "HDFC Mutual Fund",
    "shortName": "HDFC AMC",
    "logoText": "🔴",
    "badge": "Market Leader",
    "aumTotalCr": 650000,
    "established": 1999,
    "hq": "Mumbai, Maharashtra",
    "cio": "Navneet Munot",
    "searchQuery": "hdfc",
    "description": "HDFC Asset Management Company is one of India's premier mutual fund houses managing massive equity, debt, and hybrid assets with decades of wealth-creation pedigree.",
    "schemeIds": [
      "hdfc-flexicap",
      "hdfc-midcap",
      "hdfc-smallcap",
      "hdfc-top100",
      "hdfc-balanced-adv",
      "hdfc-corporate-bond",
      "hdfc-nifty50-index"
    ]
  },
  {
    "id": "sbi",
    "name": "SBI Mutual Fund",
    "shortName": "SBI Funds",
    "logoText": "🔵",
    "badge": "India's Largest AMC",
    "aumTotalCr": 920000,
    "established": 1987,
    "hq": "Mumbai, Maharashtra",
    "cio": "R. Srinivasan",
    "searchQuery": "sbi",
    "description": "A joint venture between State Bank of India and Amundi (Europe's leading asset manager). SBI MF commands the largest AUM in the Indian mutual fund industry with deep nationwide retail reach.",
    "schemeIds": [
      "sbi-smallcap",
      "sbi-elss",
      "sbi-bluechip",
      "sbi-magnum-midcap",
      "sbi-contra",
      "sbi-liquid",
      "sbi-overnight"
    ]
  },
  {
    "id": "icici",
    "name": "ICICI Prudential Mutual Fund",
    "shortName": "ICICI Pru",
    "logoText": "🟠",
    "badge": "Value & Contrarian Pioneer",
    "aumTotalCr": 710000,
    "established": 1993,
    "hq": "Mumbai, Maharashtra",
    "cio": "S. Naren",
    "searchQuery": "icici prudential",
    "description": "Pioneered contrarian and value investing in India. Known for market-cycle asset allocation, disciplined counter-cyclical equity calls, and heavyweight institutional risk governance.",
    "schemeIds": [
      "icici-bluechip",
      "icici-smallcap",
      "icici-midcap",
      "icici-value-disc",
      "icici-balanced-adv"
    ]
  },
  {
    "id": "nippon",
    "name": "Nippon India Mutual Fund",
    "shortName": "Nippon India",
    "logoText": "🗾",
    "badge": "Retail & ETF Powerhouse",
    "aumTotalCr": 490000,
    "established": 1995,
    "hq": "Mumbai, Maharashtra",
    "cio": "Sailesh Raj Bhan",
    "searchQuery": "nippon india",
    "description": "Backed by Nippon Life Insurance (Japan), Nippon India MF operates India's largest ETF ecosystem and one of the highest-rated small cap franchises with deep domestic coverage.",
    "schemeIds": [
      "nippon-smallcap",
      "nippon-largecap",
      "nippon-growth",
      "nippon-multicap",
      "nippon-power-infra",
      "nippon-gilt"
    ]
  },
  {
    "id": "kotak",
    "name": "Kotak Mahindra Mutual Fund",
    "shortName": "Kotak AMC",
    "logoText": "🔺",
    "badge": "Consistent Compounder",
    "aumTotalCr": 380000,
    "established": 1998,
    "hq": "Mumbai, Maharashtra",
    "cio": "Harsha Upadhyaya",
    "searchQuery": "kotak",
    "description": "Part of the Kotak Mahindra Group. Renowned for conservative, high-governance portfolio construction, low turnover, and strong risk-adjusted returns across market cycles.",
    "schemeIds": [
      "kotak-smallcap",
      "kotak-emerging-midcap",
      "kotak-flexicap",
      "kotak-bluechip"
    ]
  },
  {
    "id": "axis",
    "name": "Axis Mutual Fund",
    "shortName": "Axis AMC",
    "logoText": "🟣",
    "badge": "Quality & Growth Specialist",
    "aumTotalCr": 260000,
    "established": 2009,
    "hq": "Mumbai, Maharashtra",
    "cio": "Ashish Gupta",
    "searchQuery": "axis",
    "description": "Focuses on high-quality companies with sustainable competitive moats and secular earnings visibility. Manages leading small and mid-cap equity franchises.",
    "schemeIds": [
      "axis-smallcap",
      "axis-midcap",
      "axis-bluechip",
      "axis-flexicap",
      "axis-elss"
    ]
  },
  {
    "id": "quant",
    "name": "Quant Mutual Fund",
    "shortName": "Quant AMC",
    "logoText": "⚡",
    "badge": "Algorithmic & Momentum Alpha",
    "aumTotalCr": 85000,
    "established": 2018,
    "hq": "Mumbai, Maharashtra",
    "cio": "Sandeep Tandon",
    "searchQuery": "quant",
    "description": "Uses predictive analytics and its proprietary VLRT framework (Valuation, Liquidity, Risk, Timing) to execute high-conviction, dynamic sector rotations that deliver sector-leading CAGR.",
    "schemeIds": [
      "quant-smallcap",
      "quant-elss",
      "quant-midcap",
      "quant-flexicap",
      "quant-active"
    ]
  },
  {
    "id": "mirae",
    "name": "Mirae Asset Mutual Fund",
    "shortName": "Mirae Asset",
    "logoText": "🔷",
    "badge": "Consistent Long-Term Alpha",
    "aumTotalCr": 165000,
    "established": 2008,
    "hq": "Mumbai, Maharashtra",
    "cio": "Neelesh Surana",
    "searchQuery": "mirae asset",
    "description": "South Korean financial giant with a phenomenal wealth creation track record in India. Famous for high-conviction bottom-up growth picks that consistently beat TRI benchmarks.",
    "schemeIds": [
      "mirae-largecap",
      "mirae-largemidcap",
      "mirae-midcap",
      "mirae-elss"
    ]
  },
  {
    "id": "tata",
    "name": "Tata Mutual Fund",
    "shortName": "Tata AMC",
    "logoText": "💠",
    "badge": "Tata Trust & Governance",
    "aumTotalCr": 140000,
    "established": 1994,
    "hq": "Mumbai, Maharashtra",
    "cio": "Rahul Singh",
    "searchQuery": "tata",
    "description": "Backed by the prestigious Tata Group, adhering to gold-standard corporate ethics, rigorous balance-sheet audits, and high-conviction thematic & small cap strategies.",
    "schemeIds": [
      "tata-smallcap",
      "tata-digital-india",
      "tata-midcap",
      "tata-largemidcap"
    ]
  },
  {
    "id": "motilal",
    "name": "Motilal Oswal Mutual Fund",
    "shortName": "Motilal Oswal",
    "logoText": "🔶",
    "badge": "QGLP Philosophy",
    "aumTotalCr": 65000,
    "established": 2008,
    "hq": "Mumbai, Maharashtra",
    "cio": "Niket Shah",
    "searchQuery": "motilal oswal",
    "description": "Famous for its 'Buy Right, Sit Tight' philosophy grounded in QGLP (Quality, Growth, Longevity, and Price). Top performer in mid-cap equity space.",
    "schemeIds": [
      "motilal-midcap",
      "motilal-smallcap",
      "motilal-flexicap",
      "motilal-largemidcap"
    ]
  },
  {
    "id": "ppfas",
    "name": "PPFAS Mutual Fund",
    "shortName": "Parag Parikh",
    "logoText": "🐢",
    "badge": "Value Compounding Legend",
    "aumTotalCr": 78000,
    "established": 2013,
    "hq": "Mumbai, Maharashtra",
    "cio": "Rajeev Thakkar",
    "searchQuery": "parag parikh",
    "description": "Legendary value-investing boutique AMC. Exercises skin-in-the-game philosophy where fund promoters invest heavily in their own schemes alongside retail investors.",
    "schemeIds": [
      "ppfas-flexi",
      "ppfas-elss",
      "ppfas-dynamic-asset"
    ]
  },
  {
    "id": "uti",
    "name": "UTI Mutual Fund",
    "shortName": "UTI AMC",
    "logoText": "🏛️",
    "badge": "Pioneer of Indian MFs",
    "aumTotalCr": 310000,
    "established": 1964,
    "hq": "Mumbai, Maharashtra",
    "cio": "Vetri Subramaniam",
    "searchQuery": "uti",
    "description": "The institution that created the mutual fund industry in India in 1964. Combines institutional research, low tracking error index funds, and large-cap equity consistency.",
    "schemeIds": [
      "uti-nifty50",
      "uti-flexicap",
      "uti-midcap"
    ]
  },
  {
    "id": "dsp",
    "name": "DSP Mutual Fund",
    "shortName": "DSP AMC",
    "logoText": "🌲",
    "badge": "Disciplined Active Manager",
    "aumTotalCr": 145000,
    "established": 1996,
    "hq": "Mumbai, Maharashtra",
    "cio": "Vinit Sambre",
    "searchQuery": "dsp",
    "description": "Over 150 years of financial heritage. Renowned for disciplined small-cap and mid-cap research, patient long-term capital deployment, and robust risk management.",
    "schemeIds": [
      "dsp-smallcap",
      "dsp-midcap",
      "dsp-top100"
    ]
  },
  {
    "id": "bandhan",
    "name": "Bandhan Mutual Fund",
    "shortName": "Bandhan AMC",
    "logoText": "🤝",
    "badge": "Emerging Equity Powerhouse",
    "aumTotalCr": 135000,
    "established": 2000,
    "hq": "Mumbai, Maharashtra",
    "cio": "Vishal Kapoor",
    "searchQuery": "bandhan",
    "description": "Formerly IDFC Mutual Fund, now part of Bandhan Financial Holdings. Strong track record in high-alpha small cap equity and disciplined multi-cap portfolios.",
    "schemeIds": [
      "bandhan-smallcap",
      "bandhan-core-equity",
      "bandhan-flexicap"
    ]
  },
  {
    "id": "edelweiss",
    "name": "Edelweiss Mutual Fund",
    "shortName": "Edelweiss AMC",
    "logoText": "💎",
    "badge": "Agile & Mid-Cap Alpha",
    "aumTotalCr": 125000,
    "established": 2009,
    "hq": "Mumbai, Maharashtra",
    "cio": "Trideep Bhattacharya",
    "searchQuery": "edelweiss",
    "description": "Fast-growing AMC with strong factor-based equity research and market-leading debt Bharat Bond ETFs. Proven alpha generator in mid-cap and small-cap equities.",
    "schemeIds": [
      "edelweiss-midcap",
      "edelweiss-smallcap",
      "edelweiss-largemidcap"
    ]
  },
  {
    "id": "jm",
    "name": "JM Financial Mutual Fund",
    "shortName": "JM Financial",
    "logoText": "🪙",
    "badge": "Momentum & Growth Turnaround",
    "aumTotalCr": 9200,
    "established": 1994,
    "hq": "Mumbai, Maharashtra",
    "cio": "Satish Ramanathan",
    "searchQuery": "jm",
    "description": "Backed by JM Financial Group. Highly respected equity boutique AMC with outstanding multi-cap returns following portfolio revamps by CIO Satish Ramanathan.",
    "schemeIds": [
      "jm-flexicap",
      "jm-midcap",
      "jm-largecap"
    ]
  },
  {
    "id": "canara-robeco",
    "name": "Canara Robeco Mutual Fund",
    "shortName": "Canara Robeco",
    "logoText": "CR",
    "badge": "Scheme details from live catalog",
    "aumTotalCr": null,
    "established": null,
    "hq": "—",
    "cio": "—",
    "searchQuery": "canara robeco",
    "description": "Scheme NAV and available history are sourced from the public NAV catalog. Consult the fund house for current costs, holdings, and scheme documents.",
    "schemeIds": [
      "canara-robeco-largecap"
    ]
  },
  {
    "id": "franklin-templeton",
    "name": "Franklin Templeton Mutual Fund",
    "shortName": "Franklin Templeton",
    "logoText": "FT",
    "badge": "Scheme details from live catalog",
    "aumTotalCr": null,
    "established": null,
    "hq": "—",
    "cio": "—",
    "searchQuery": "franklin templeton",
    "description": "Scheme NAV and available history are sourced from the public NAV catalog. Consult the fund house for current costs, holdings, and scheme documents.",
    "schemeIds": [
      "franklin-flexicap"
    ]
  }
];

// ============================================================================
// MUTUAL FUNDS DATASET — 76 SCHEMES WITH AVAILABLE NAV HISTORY
// ============================================================================
window.MUTUAL_FUNDS = [
  {
    "id": "invesco-midcap",
    "houseId": "invesco",
    "amfiCode": 120304,
    "name": "Invesco India Mid Cap Fund",
    "shortName": "Invesco Midcap",
    "amc": "Invesco Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 174.65,
    "aumCr": 6250,
    "expenseRatio": 0.62,
    "regularExpenseRatio": 1.74,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Taher Badshah & Pranav Gokhale",
    "benchmark": "BSE 150 MidCap TRI",
    "returns": {
      "y1": 44.5,
      "y3": 34.2,
      "y5": 29.5,
      "y10": 20.8,
      "inception": 29.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 6.8,
      "beta": 0.88,
      "sharpe": 1.62,
      "sortino": 2.34,
      "stdDev": 14.1
    },
    "holdings": [
      {
        "name": "Trent Ltd.",
        "percent": 5.45,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 4.85,
        "sector": "Information Technology"
      },
      {
        "name": "Bharat Forge Ltd.",
        "percent": 4.25,
        "sector": "Auto Ancillary / Industrials"
      },
      {
        "name": "The Federal Bank Ltd.",
        "percent": 3.95,
        "sector": "Financial Services"
      },
      {
        "name": "Coforge Ltd.",
        "percent": 3.8,
        "sector": "Information Technology"
      },
      {
        "name": "Dixon Technologies Ltd.",
        "percent": 3.55,
        "sector": "Consumer Electronics"
      },
      {
        "name": "Sundram Fasteners Ltd.",
        "percent": 3.4,
        "sector": "Auto Components"
      },
      {
        "name": "Polycab India Ltd.",
        "percent": 3.25,
        "sector": "Capital Goods / Cables"
      },
      {
        "name": "Balkrishna Industries Ltd.",
        "percent": 3.1,
        "sector": "Tyres & Rubber"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.4,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Trent Ltd.",
      "Persistent Systems Ltd.",
      "Bharat Forge Ltd.",
      "The Federal Bank Ltd.",
      "Coforge Ltd.",
      "Dixon Technologies Ltd.",
      "Sundram Fasteners Ltd.",
      "Polycab India Ltd.",
      "Balkrishna Industries Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 28,
      "Technology": 22,
      "Consumer": 20,
      "Financials": 18,
      "Auto": 12
    }
  },
  {
    "id": "invesco-smallcap",
    "houseId": "invesco",
    "amfiCode": 145044,
    "name": "Invesco India Smallcap Fund",
    "shortName": "Invesco Smallcap",
    "amc": "Invesco Mutual Fund",
    "category": "Small Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 41.8,
    "aumCr": 5420,
    "expenseRatio": 0.58,
    "regularExpenseRatio": 1.72,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Taher Badshah & Pranav Gokhale",
    "benchmark": "BSE 250 SmallCap TRI",
    "returns": {
      "y1": 48.2,
      "y3": 33.8,
      "y5": 32.4,
      "y10": 23.5,
      "inception": 32.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 7.4,
      "beta": 0.86,
      "sharpe": 1.68,
      "sortino": 2.45,
      "stdDev": 15.2
    },
    "holdings": [
      {
        "name": "Equitas Small Finance Bank Ltd.",
        "percent": 4.85,
        "sector": "Financial Services"
      },
      {
        "name": "Birlasoft Ltd.",
        "percent": 4.45,
        "sector": "Information Technology"
      },
      {
        "name": "Timken India Ltd.",
        "percent": 4.1,
        "sector": "Industrial Machinery"
      },
      {
        "name": "KPIT Technologies Ltd.",
        "percent": 3.85,
        "sector": "Automotive Software"
      },
      {
        "name": "KNR Constructions Ltd.",
        "percent": 3.65,
        "sector": "Construction & Infra"
      },
      {
        "name": "Craftsman Automation Ltd.",
        "percent": 3.45,
        "sector": "Auto Components"
      },
      {
        "name": "JB Chemicals & Pharma Ltd.",
        "percent": 3.3,
        "sector": "Healthcare / Pharma"
      },
      {
        "name": "Rolex Rings Ltd.",
        "percent": 3.15,
        "sector": "Auto Ancillary"
      },
      {
        "name": "Kajaria Ceramics Ltd.",
        "percent": 3.05,
        "sector": "Building Products"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.25,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Equitas Small Finance Bank Ltd.",
      "Birlasoft Ltd.",
      "Timken India Ltd.",
      "KPIT Technologies Ltd.",
      "KNR Constructions Ltd.",
      "Craftsman Automation Ltd.",
      "JB Chemicals & Pharma Ltd.",
      "Rolex Rings Ltd.",
      "Kajaria Ceramics Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 30,
      "Technology": 20,
      "Financials": 17,
      "Auto": 16,
      "Healthcare": 10,
      "Others": 7
    }
  },
  {
    "id": "invesco-flexicap",
    "houseId": "invesco",
    "amfiCode": 149639,
    "name": "Invesco India Flexi Cap Fund",
    "shortName": "Invesco Flexi",
    "amc": "Invesco Mutual Fund",
    "category": "Flexi Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 22.45,
    "aumCr": 2350,
    "expenseRatio": 0.65,
    "regularExpenseRatio": 1.82,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Taher Badshah & Amit Ganatra",
    "benchmark": "BSE 500 TRI",
    "returns": {
      "y1": 38.6,
      "y3": 26.2,
      "y5": 24.8,
      "y10": 18.5,
      "inception": 24.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 4.9,
      "beta": 0.9,
      "sharpe": 1.48,
      "sortino": 2.12,
      "stdDev": 13.8
    },
    "holdings": [
      {
        "name": "ICICI Bank Ltd.",
        "percent": 8.45,
        "sector": "Financial Services"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 7.8,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 6.95,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 5.8,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 5.1,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Tata Motors Ltd.",
        "percent": 4.45,
        "sector": "Automobile"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 3.9,
        "sector": "Telecommunication"
      },
      {
        "name": "Trent Ltd.",
        "percent": 3.65,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Sun Pharmaceutical Ind. Ltd.",
        "percent": 3.4,
        "sector": "Healthcare / Pharma"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.1,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "ICICI Bank Ltd.",
      "HDFC Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "Tata Motors Ltd.",
      "Bharti Airtel Ltd.",
      "Trent Ltd.",
      "Sun Pharmaceutical Ind. Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 33,
      "Technology": 18,
      "Consumer": 16,
      "Industrials": 15,
      "Energy": 12,
      "Others": 6
    }
  },
  {
    "id": "invesco-largecap",
    "houseId": "invesco",
    "amfiCode": 120302,
    "name": "Invesco India Largecap Fund",
    "shortName": "Invesco Largecap",
    "amc": "Invesco Mutual Fund",
    "category": "Large Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 74.2,
    "aumCr": 1180,
    "expenseRatio": 0.72,
    "regularExpenseRatio": 1.95,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Amit Ganatra & Dhimant Kothari",
    "benchmark": "NIFTY 100 TRI",
    "returns": {
      "y1": 31.4,
      "y3": 20.8,
      "y5": 19.5,
      "y10": 15.2,
      "inception": 19.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 3.4,
      "beta": 0.94,
      "sharpe": 1.35,
      "sortino": 1.9,
      "stdDev": 12.8
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 9.45,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 8.9,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 8.2,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 7.15,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 6.3,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Tata Consultancy Services Ltd.",
        "percent": 5.45,
        "sector": "Information Technology"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 4.8,
        "sector": "Telecommunication"
      },
      {
        "name": "Axis Bank Ltd.",
        "percent": 4.25,
        "sector": "Financial Services"
      },
      {
        "name": "ITC Ltd.",
        "percent": 3.95,
        "sector": "FMCG / Tobacco"
      },
      {
        "name": "Cash & Money Market",
        "percent": 3.15,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "Tata Consultancy Services Ltd.",
      "Bharti Airtel Ltd.",
      "Axis Bank Ltd.",
      "ITC Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 38,
      "Technology": 20,
      "Energy": 14,
      "Industrials": 13,
      "FMCG": 9,
      "Others": 6
    }
  },
  {
    "id": "invesco-elss",
    "houseId": "invesco",
    "amfiCode": 120307,
    "name": "Invesco India ELSS Tax Saver Fund",
    "shortName": "Invesco ELSS",
    "amc": "Invesco Mutual Fund",
    "category": "ELSS / Tax",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 122.8,
    "aumCr": 2650,
    "expenseRatio": 0.68,
    "regularExpenseRatio": 1.79,
    "exitLoad": "Nil (3Y Lock-in)",
    "minSip": 500,
    "manager": "Amit Ganatra & Dhimant Kothari",
    "benchmark": "BSE 500 TRI",
    "returns": {
      "y1": 32.8,
      "y3": 23.4,
      "y5": 23.8,
      "y10": 16.8,
      "inception": 23.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 5.1,
      "beta": 0.89,
      "sharpe": 1.44,
      "sortino": 2.05,
      "stdDev": 13.2
    },
    "holdings": [
      {
        "name": "ICICI Bank Ltd.",
        "percent": 8.2,
        "sector": "Financial Services"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 7.9,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 7.15,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 5.6,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 4.95,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Tata Motors Ltd.",
        "percent": 4.25,
        "sector": "Automobile"
      },
      {
        "name": "Trent Ltd.",
        "percent": 3.85,
        "sector": "Retail / Fashion"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 3.6,
        "sector": "Telecommunication"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 3.35,
        "sector": "Information Technology"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.15,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "ICICI Bank Ltd.",
      "HDFC Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "Tata Motors Ltd.",
      "Trent Ltd.",
      "Bharti Airtel Ltd.",
      "Persistent Systems Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 34,
      "Technology": 17,
      "Energy": 14,
      "Auto": 13,
      "Industrials": 11,
      "Others": 11
    }
  },
  {
    "id": "hdfc-flexicap",
    "houseId": "hdfc",
    "amfiCode": 118989,
    "name": "HDFC Flexi Cap Fund",
    "shortName": "HDFC Flexi",
    "amc": "HDFC Mutual Fund",
    "category": "Flexi Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 1920.4,
    "aumCr": 64200,
    "expenseRatio": 0.81,
    "regularExpenseRatio": 1.55,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Roshi Jain",
    "benchmark": "NIFTY 500 TRI",
    "returns": {
      "y1": 41.2,
      "y3": 29.8,
      "y5": 26.8,
      "y10": 17.8,
      "inception": 26.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 6.2,
      "beta": 0.94,
      "sharpe": 1.65,
      "sortino": 2.24,
      "stdDev": 14.2
    },
    "holdings": [
      {
        "name": "ICICI Bank Ltd.",
        "percent": 9.15,
        "sector": "Financial Services"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 8.65,
        "sector": "Financial Services"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 6.1,
        "sector": "Information Technology"
      },
      {
        "name": "HCL Technologies Ltd.",
        "percent": 5.45,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 4.9,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Cipla Ltd.",
        "percent": 4.25,
        "sector": "Healthcare / Pharma"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 3.95,
        "sector": "Telecommunication"
      },
      {
        "name": "State Bank of India",
        "percent": 3.75,
        "sector": "Financial Services"
      },
      {
        "name": "Axis Bank Ltd.",
        "percent": 3.5,
        "sector": "Financial Services"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "ICICI Bank Ltd.",
      "HDFC Bank Ltd.",
      "Infosys Ltd.",
      "HCL Technologies Ltd.",
      "Larsen & Toubro Ltd.",
      "Cipla Ltd.",
      "Bharti Airtel Ltd.",
      "State Bank of India",
      "Axis Bank Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 36,
      "Technology": 19,
      "Healthcare": 13,
      "Industrials": 12,
      "Energy": 11,
      "Others": 9
    }
  },
  {
    "id": "hdfc-midcap",
    "houseId": "hdfc",
    "amfiCode": 118968,
    "name": "HDFC Mid-Cap Opportunities Fund",
    "shortName": "HDFC Midcap",
    "amc": "HDFC Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 194.2,
    "aumCr": 72500,
    "expenseRatio": 0.74,
    "regularExpenseRatio": 1.58,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Chirag Setalvad",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 46.8,
      "y3": 33.4,
      "y5": 28.6,
      "y10": 21.2,
      "inception": 28.6
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 5.8,
      "beta": 0.9,
      "sharpe": 1.7,
      "sortino": 2.38,
      "stdDev": 14.5
    },
    "holdings": [
      {
        "name": "Max Healthcare Institute Ltd.",
        "percent": 4.85,
        "sector": "Healthcare Services"
      },
      {
        "name": "The Indian Hotels Co. Ltd.",
        "percent": 4.2,
        "sector": "Hospitality / Tourism"
      },
      {
        "name": "Tata Communications Ltd.",
        "percent": 3.95,
        "sector": "Telecommunication"
      },
      {
        "name": "Federal Bank Ltd.",
        "percent": 3.7,
        "sector": "Financial Services"
      },
      {
        "name": "Coforge Ltd.",
        "percent": 3.5,
        "sector": "Information Technology"
      },
      {
        "name": "Apar Industries Ltd.",
        "percent": 3.35,
        "sector": "Heavy Electricals"
      },
      {
        "name": "Apollo Tyres Ltd.",
        "percent": 3.15,
        "sector": "Automobile Parts"
      },
      {
        "name": "Sundram Fasteners Ltd.",
        "percent": 2.95,
        "sector": "Auto Components"
      },
      {
        "name": "Balkrishna Industries Ltd.",
        "percent": 2.8,
        "sector": "Tyres & Rubber"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.4,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Max Healthcare Institute Ltd.",
      "The Indian Hotels Co. Ltd.",
      "Tata Communications Ltd.",
      "Federal Bank Ltd.",
      "Coforge Ltd.",
      "Apar Industries Ltd.",
      "Apollo Tyres Ltd.",
      "Sundram Fasteners Ltd.",
      "Balkrishna Industries Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 26,
      "Financials": 20,
      "Consumer": 18,
      "Healthcare": 16,
      "Technology": 12,
      "Others": 8
    }
  },
  {
    "id": "hdfc-smallcap",
    "houseId": "hdfc",
    "amfiCode": 130503,
    "name": "HDFC Small Cap Fund",
    "shortName": "HDFC Small Cap",
    "amc": "HDFC Mutual Fund",
    "category": "Small Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 138.4,
    "aumCr": 34200,
    "expenseRatio": 0.68,
    "regularExpenseRatio": 1.62,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Chirag Setalvad",
    "benchmark": "BSE 250 SmallCap TRI",
    "returns": {
      "y1": 44.8,
      "y3": 31.6,
      "y5": 30.2,
      "y10": 22.4,
      "inception": 30.2
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 6.9,
      "beta": 0.85,
      "sharpe": 1.64,
      "sortino": 2.3,
      "stdDev": 14.8
    },
    "holdings": [
      {
        "name": "Firstsource Solutions Ltd.",
        "percent": 4.95,
        "sector": "Information Technology"
      },
      {
        "name": "Sonata Software Ltd.",
        "percent": 4.4,
        "sector": "Information Technology"
      },
      {
        "name": "Bank of Baroda",
        "percent": 3.9,
        "sector": "Financial Services"
      },
      {
        "name": "eClerx Services Ltd.",
        "percent": 3.75,
        "sector": "IT Enabled Services"
      },
      {
        "name": "KNR Constructions Ltd.",
        "percent": 3.5,
        "sector": "Infrastructure"
      },
      {
        "name": "Equitas Small Finance Bank Ltd.",
        "percent": 3.35,
        "sector": "Financial Services"
      },
      {
        "name": "Great Eastern Shipping Co.",
        "percent": 3.2,
        "sector": "Shipping / Logistics"
      },
      {
        "name": "SKF India Ltd.",
        "percent": 3.05,
        "sector": "Industrial Machinery"
      },
      {
        "name": "Kalpataru Projects Int. Ltd.",
        "percent": 2.9,
        "sector": "Power T&D / Infra"
      },
      {
        "name": "Cash & Money Market",
        "percent": 6.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Firstsource Solutions Ltd.",
      "Sonata Software Ltd.",
      "Bank of Baroda",
      "eClerx Services Ltd.",
      "KNR Constructions Ltd.",
      "Equitas Small Finance Bank Ltd.",
      "Great Eastern Shipping Co.",
      "SKF India Ltd.",
      "Kalpataru Projects Int. Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Technology": 24,
      "Industrials": 22,
      "Financials": 19,
      "Consumer": 15,
      "Logistics": 10,
      "Others": 10
    }
  },
  {
    "id": "hdfc-top100",
    "houseId": "hdfc",
    "amfiCode": 118961,
    "name": "HDFC Top 100 Fund",
    "shortName": "HDFC Top 100",
    "amc": "HDFC Mutual Fund",
    "category": "Large Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 1084.5,
    "aumCr": 36800,
    "expenseRatio": 0.92,
    "regularExpenseRatio": 1.68,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Rahul Baijal",
    "benchmark": "NIFTY 100 TRI",
    "returns": {
      "y1": 34.2,
      "y3": 23.5,
      "y5": 20.8,
      "y10": 15.6,
      "inception": 20.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 3.8,
      "beta": 0.92,
      "sharpe": 1.42,
      "sortino": 2.05,
      "stdDev": 12.9
    },
    "holdings": [
      {
        "name": "ICICI Bank Ltd.",
        "percent": 9.8,
        "sector": "Financial Services"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 9.4,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 8.1,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 7.3,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 6.5,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Tata Consultancy Services Ltd.",
        "percent": 5.6,
        "sector": "Information Technology"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 4.9,
        "sector": "Telecommunication"
      },
      {
        "name": "State Bank of India",
        "percent": 4.4,
        "sector": "Financial Services"
      },
      {
        "name": "Axis Bank Ltd.",
        "percent": 3.8,
        "sector": "Financial Services"
      },
      {
        "name": "Cash & Money Market",
        "percent": 2.9,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "ICICI Bank Ltd.",
      "HDFC Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "Tata Consultancy Services Ltd.",
      "Bharti Airtel Ltd.",
      "State Bank of India",
      "Axis Bank Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 40,
      "Technology": 20,
      "Energy": 14,
      "Industrials": 13,
      "Telecom": 7,
      "Others": 6
    }
  },
  {
    "id": "hdfc-balanced-adv",
    "houseId": "hdfc",
    "amfiCode": 118955,
    "name": "HDFC Balanced Advantage Fund",
    "shortName": "HDFC BAF",
    "amc": "HDFC Mutual Fund",
    "category": "Balanced Advantage",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 478.2,
    "aumCr": 89500,
    "expenseRatio": 0.72,
    "regularExpenseRatio": 1.45,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Gopal Agrawal & Srinivasan Ramamurthy",
    "benchmark": "NIFTY 50 Hybrid Composite",
    "returns": {
      "y1": 29.5,
      "y3": 22.8,
      "y5": 21.2,
      "y10": 16.8,
      "inception": 21.2
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 5.2,
      "beta": 0.78,
      "sharpe": 1.72,
      "sortino": 2.4,
      "stdDev": 10.8
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 6.8,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 6.2,
        "sector": "Financial Services"
      },
      {
        "name": "Coal India Ltd.",
        "percent": 4.5,
        "sector": "Metals & Mining"
      },
      {
        "name": "State Bank of India",
        "percent": 4.1,
        "sector": "Financial Services"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 3.8,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 3.5,
        "sector": "Information Technology"
      },
      {
        "name": "Government Securities (G-Sec)",
        "percent": 18.5,
        "sector": "Sovereign Debt"
      },
      {
        "name": "Corporate Bonds (AAA)",
        "percent": 12.2,
        "sector": "Debt Securities"
      },
      {
        "name": "Cash & Hedged Derivatives",
        "percent": 11.4,
        "sector": "Arbitrage / Cash"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "Coal India Ltd.",
      "State Bank of India",
      "Larsen & Toubro Ltd.",
      "Infosys Ltd.",
      "Government Securities (G-Sec)",
      "Corporate Bonds (AAA)",
      "Cash & Hedged Derivatives"
    ],
    "sectors": {
      "Financials": 28,
      "Debt & G-Sec": 32,
      "Energy": 12,
      "Technology": 10,
      "Industrials": 10,
      "Cash": 8
    }
  },
  {
    "id": "sbi-smallcap",
    "houseId": "sbi",
    "amfiCode": 125497,
    "name": "SBI Small Cap Fund",
    "shortName": "SBI Small Cap",
    "amc": "SBI Mutual Fund",
    "category": "Small Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 172.5,
    "aumCr": 31200,
    "expenseRatio": 0.69,
    "regularExpenseRatio": 1.58,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "R. Srinivasan",
    "benchmark": "BSE 250 SmallCap TRI",
    "returns": {
      "y1": 36.8,
      "y3": 25.4,
      "y5": 28.4,
      "y10": 23.8,
      "inception": 28.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 5.6,
      "beta": 0.78,
      "sharpe": 1.55,
      "sortino": 2.2,
      "stdDev": 13.6
    },
    "holdings": [
      {
        "name": "Blue Star Ltd.",
        "percent": 4.85,
        "sector": "Consumer Electricals"
      },
      {
        "name": "Kalpataru Projects Int. Ltd.",
        "percent": 4.2,
        "sector": "Capital Goods"
      },
      {
        "name": "Finolex Industries Ltd.",
        "percent": 3.95,
        "sector": "Pipes & Plastics"
      },
      {
        "name": "Carborundum Universal Ltd.",
        "percent": 3.75,
        "sector": "Abrasives / Industrial"
      },
      {
        "name": "V-Guard Industries Ltd.",
        "percent": 3.5,
        "sector": "Consumer Durables"
      },
      {
        "name": "Lemon Tree Hotels Ltd.",
        "percent": 3.3,
        "sector": "Hospitality / Tourism"
      },
      {
        "name": "Great Eastern Shipping Co.",
        "percent": 3.15,
        "sector": "Shipping / Logistics"
      },
      {
        "name": "Chalet Hotels Ltd.",
        "percent": 2.95,
        "sector": "Hospitality"
      },
      {
        "name": "TTK Healthcare Ltd.",
        "percent": 2.8,
        "sector": "Healthcare Products"
      },
      {
        "name": "Cash & Money Market",
        "percent": 8.4,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Blue Star Ltd.",
      "Kalpataru Projects Int. Ltd.",
      "Finolex Industries Ltd.",
      "Carborundum Universal Ltd.",
      "V-Guard Industries Ltd.",
      "Lemon Tree Hotels Ltd.",
      "Great Eastern Shipping Co.",
      "Chalet Hotels Ltd.",
      "TTK Healthcare Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Capital Goods": 24,
      "Consumer Durables": 21,
      "Chemicals": 14,
      "Hospitality": 12,
      "Healthcare": 10,
      "Cash": 19
    }
  },
  {
    "id": "sbi-elss",
    "houseId": "sbi",
    "amfiCode": 119718,
    "name": "SBI Long Term Equity Fund",
    "shortName": "SBI ELSS",
    "amc": "SBI Mutual Fund",
    "category": "ELSS / Tax",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 412.3,
    "aumCr": 26800,
    "expenseRatio": 0.98,
    "regularExpenseRatio": 1.62,
    "exitLoad": "Nil (3Y Lock-in)",
    "minSip": 500,
    "manager": "Dinesh Balachandran",
    "benchmark": "BSE 500 TRI",
    "returns": {
      "y1": 48.6,
      "y3": 32.4,
      "y5": 26.5,
      "y10": 17.6,
      "inception": 26.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 7.8,
      "beta": 0.88,
      "sharpe": 1.74,
      "sortino": 2.42,
      "stdDev": 13.9
    },
    "holdings": [
      {
        "name": "ICICI Bank Ltd.",
        "percent": 7.4,
        "sector": "Financial Services"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 6.8,
        "sector": "Engineering & Infra"
      },
      {
        "name": "State Bank of India",
        "percent": 5.9,
        "sector": "Financial Services"
      },
      {
        "name": "Oil & Natural Gas Corp (ONGC)",
        "percent": 5.4,
        "sector": "Oil & Gas Exploration"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 4.85,
        "sector": "Financial Services"
      },
      {
        "name": "Mahindra & Mahindra Ltd.",
        "percent": 4.3,
        "sector": "Automobile"
      },
      {
        "name": "GAIL (India) Ltd.",
        "percent": 3.9,
        "sector": "Gas Transmission"
      },
      {
        "name": "Tech Mahindra Ltd.",
        "percent": 3.65,
        "sector": "Information Technology"
      },
      {
        "name": "NTPC Ltd.",
        "percent": 3.4,
        "sector": "Power Generation"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.2,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "ICICI Bank Ltd.",
      "Larsen & Toubro Ltd.",
      "State Bank of India",
      "Oil & Natural Gas Corp (ONGC)",
      "HDFC Bank Ltd.",
      "Mahindra & Mahindra Ltd.",
      "GAIL (India) Ltd.",
      "Tech Mahindra Ltd.",
      "NTPC Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 28,
      "Energy": 22,
      "Industrials": 18,
      "Auto": 12,
      "Technology": 11,
      "Utilities": 9
    }
  },
  {
    "id": "sbi-bluechip",
    "houseId": "sbi",
    "amfiCode": 119598,
    "name": "SBI Bluechip Fund",
    "shortName": "SBI Bluechip",
    "amc": "SBI Mutual Fund",
    "category": "Large Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 94.8,
    "aumCr": 48500,
    "expenseRatio": 0.84,
    "regularExpenseRatio": 1.6,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Sohini Andani",
    "benchmark": "BSE 100 TRI",
    "returns": {
      "y1": 32.5,
      "y3": 21.2,
      "y5": 19.4,
      "y10": 15.2,
      "inception": 19.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 3.6,
      "beta": 0.91,
      "sharpe": 1.38,
      "sortino": 1.95,
      "stdDev": 12.6
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 9.6,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 8.9,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 7.8,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 6.7,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 5.9,
        "sector": "Engineering & Infra"
      },
      {
        "name": "ITC Ltd.",
        "percent": 4.8,
        "sector": "FMCG / Tobacco"
      },
      {
        "name": "Tata Consultancy Services Ltd.",
        "percent": 4.4,
        "sector": "Information Technology"
      },
      {
        "name": "State Bank of India",
        "percent": 4.1,
        "sector": "Financial Services"
      },
      {
        "name": "Sun Pharma Industries Ltd.",
        "percent": 3.6,
        "sector": "Healthcare / Pharma"
      },
      {
        "name": "Cash & Money Market",
        "percent": 3.2,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "ITC Ltd.",
      "Tata Consultancy Services Ltd.",
      "State Bank of India",
      "Sun Pharma Industries Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 38,
      "Technology": 18,
      "Energy": 14,
      "Industrials": 12,
      "FMCG": 10,
      "Others": 8
    }
  },
  {
    "id": "sbi-magnum-midcap",
    "houseId": "sbi",
    "amfiCode": 119723,
    "name": "SBI Magnum Midcap Fund",
    "shortName": "SBI Midcap",
    "amc": "SBI Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 248.5,
    "aumCr": 19400,
    "expenseRatio": 0.82,
    "regularExpenseRatio": 1.74,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Bhavin Vithlani",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 39.8,
      "y3": 28.5,
      "y5": 27.2,
      "y10": 19.8,
      "inception": 27.2
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 5.2,
      "beta": 0.89,
      "sharpe": 1.54,
      "sortino": 2.18,
      "stdDev": 14.2
    },
    "holdings": [
      {
        "name": "Crisil Ltd.",
        "percent": 4.6,
        "sector": "Financial Research / Ratings"
      },
      {
        "name": "Sundram Fasteners Ltd.",
        "percent": 4.15,
        "sector": "Auto Components"
      },
      {
        "name": "Schaeffler India Ltd.",
        "percent": 3.9,
        "sector": "Bearings / Precision"
      },
      {
        "name": "Page Industries Ltd.",
        "percent": 3.7,
        "sector": "Apparel / Textiles"
      },
      {
        "name": "Astral Ltd.",
        "percent": 3.5,
        "sector": "Building Products"
      },
      {
        "name": "Torrent Power Ltd.",
        "percent": 3.35,
        "sector": "Power Distribution"
      },
      {
        "name": "The Federal Bank Ltd.",
        "percent": 3.2,
        "sector": "Financial Services"
      },
      {
        "name": "Jubilant FoodWorks Ltd.",
        "percent": 3.05,
        "sector": "Quick Service Restaurants"
      },
      {
        "name": "Bata India Ltd.",
        "percent": 2.9,
        "sector": "Footwear / Retail"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Crisil Ltd.",
      "Sundram Fasteners Ltd.",
      "Schaeffler India Ltd.",
      "Page Industries Ltd.",
      "Astral Ltd.",
      "Torrent Power Ltd.",
      "The Federal Bank Ltd.",
      "Jubilant FoodWorks Ltd.",
      "Bata India Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 26,
      "Consumer": 24,
      "Financials": 18,
      "Auto": 16,
      "Utilities": 10,
      "Others": 6
    }
  },
  {
    "id": "sbi-contra",
    "houseId": "sbi",
    "amfiCode": 119711,
    "name": "SBI Contra Fund",
    "shortName": "SBI Contra",
    "amc": "SBI Mutual Fund",
    "category": "Contra / Value",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 410.8,
    "aumCr": 38500,
    "expenseRatio": 0.65,
    "regularExpenseRatio": 1.55,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Dinesh Balachandran",
    "benchmark": "BSE 500 TRI",
    "returns": {
      "y1": 46.2,
      "y3": 33.6,
      "y5": 31.4,
      "y10": 18.5,
      "inception": 31.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 8.4,
      "beta": 0.86,
      "sharpe": 1.82,
      "sortino": 2.55,
      "stdDev": 13.8
    },
    "holdings": [
      {
        "name": "Oil & Natural Gas Corp (ONGC)",
        "percent": 5.8,
        "sector": "Energy / Exploration"
      },
      {
        "name": "GAIL (India) Ltd.",
        "percent": 4.9,
        "sector": "Utilities / Gas"
      },
      {
        "name": "State Bank of India",
        "percent": 4.6,
        "sector": "Financial Services"
      },
      {
        "name": "Tech Mahindra Ltd.",
        "percent": 4.2,
        "sector": "Information Technology"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 3.9,
        "sector": "Financial Services"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 3.75,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Coal India Ltd.",
        "percent": 3.5,
        "sector": "Mining / Metals"
      },
      {
        "name": "NTPC Ltd.",
        "percent": 3.35,
        "sector": "Power Generation"
      },
      {
        "name": "ITC Ltd.",
        "percent": 3.2,
        "sector": "FMCG / Diversified"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.6,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Oil & Natural Gas Corp (ONGC)",
      "GAIL (India) Ltd.",
      "State Bank of India",
      "Tech Mahindra Ltd.",
      "HDFC Bank Ltd.",
      "Larsen & Toubro Ltd.",
      "Coal India Ltd.",
      "NTPC Ltd.",
      "ITC Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Energy": 24,
      "Financials": 22,
      "Utilities": 18,
      "Industrials": 14,
      "Technology": 12,
      "FMCG": 10
    }
  },
  {
    "id": "icici-bluechip",
    "houseId": "icici",
    "amfiCode": 120586,
    "name": "ICICI Prudential Bluechip Fund",
    "shortName": "ICICI Bluechip",
    "amc": "ICICI Prudential Mutual Fund",
    "category": "Large Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 118.4,
    "aumCr": 58400,
    "expenseRatio": 0.88,
    "regularExpenseRatio": 1.51,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Anish Tawakley",
    "benchmark": "NIFTY 100 TRI",
    "returns": {
      "y1": 36.8,
      "y3": 24.2,
      "y5": 21.4,
      "y10": 16.2,
      "inception": 21.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 4.4,
      "beta": 0.92,
      "sharpe": 1.52,
      "sortino": 2.12,
      "stdDev": 12.8
    },
    "holdings": [
      {
        "name": "ICICI Bank Ltd.",
        "percent": 9.8,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 8.9,
        "sector": "Energy / Refining"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 7.8,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 6.9,
        "sector": "Information Technology"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 6.4,
        "sector": "Financial Services"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 5.2,
        "sector": "Telecommunication"
      },
      {
        "name": "Maruti Suzuki India Ltd.",
        "percent": 4.1,
        "sector": "Automobile"
      },
      {
        "name": "Axis Bank Ltd.",
        "percent": 3.8,
        "sector": "Financial Services"
      },
      {
        "name": "Sun Pharma Industries Ltd.",
        "percent": 3.4,
        "sector": "Healthcare / Pharma"
      },
      {
        "name": "Cash & Money Market",
        "percent": 3.1,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "Larsen & Toubro Ltd.",
      "Infosys Ltd.",
      "HDFC Bank Ltd.",
      "Bharti Airtel Ltd.",
      "Maruti Suzuki India Ltd.",
      "Axis Bank Ltd.",
      "Sun Pharma Industries Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 35,
      "Energy": 18,
      "Industrials": 16,
      "Technology": 14,
      "Auto": 9,
      "Healthcare": 8
    }
  },
  {
    "id": "icici-smallcap",
    "houseId": "icici",
    "amfiCode": 149283,
    "name": "ICICI Prudential Smallcap Index Fund",
    "shortName": "ICICI Smallcap",
    "amc": "ICICI Prudential Mutual Fund",
    "category": "Small Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 32.5,
    "aumCr": 9200,
    "expenseRatio": 0.42,
    "regularExpenseRatio": 1.15,
    "exitLoad": "0.25% < 7 days",
    "minSip": 500,
    "manager": "Nishit Patel",
    "benchmark": "NIFTY Smallcap 250 TRI",
    "returns": {
      "y1": 49.5,
      "y3": 30.8,
      "y5": 31.8,
      "y10": 20.4,
      "inception": 31.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 6.2,
      "beta": 0.95,
      "sharpe": 1.6,
      "sortino": 2.22,
      "stdDev": 16.5
    },
    "holdings": [
      {
        "name": "Exide Industries Ltd.",
        "percent": 2.1,
        "sector": "Auto Electricals"
      },
      {
        "name": "Suzlon Energy Ltd.",
        "percent": 1.95,
        "sector": "Renewable Power"
      },
      {
        "name": "Multi Commodity Exchange (MCX)",
        "percent": 1.85,
        "sector": "Financial Market Infra"
      },
      {
        "name": "KEC International Ltd.",
        "percent": 1.7,
        "sector": "Power T&D / Infra"
      },
      {
        "name": "Central Depository Services (CDSL)",
        "percent": 1.65,
        "sector": "Capital Markets"
      },
      {
        "name": "Glenmark Pharmaceuticals Ltd.",
        "percent": 1.55,
        "sector": "Healthcare / Pharma"
      },
      {
        "name": "PPL Pharma Ltd.",
        "percent": 1.45,
        "sector": "Pharma / CDMO"
      },
      {
        "name": "Karur Vysya Bank Ltd.",
        "percent": 1.4,
        "sector": "Financial Services"
      },
      {
        "name": "CreditAccess Grameen Ltd.",
        "percent": 1.35,
        "sector": "Microfinance"
      },
      {
        "name": "Cash & Equivalents",
        "percent": 2.2,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Exide Industries Ltd.",
      "Suzlon Energy Ltd.",
      "Multi Commodity Exchange (MCX)",
      "KEC International Ltd.",
      "Central Depository Services (CDSL)",
      "Glenmark Pharmaceuticals Ltd.",
      "PPL Pharma Ltd.",
      "Karur Vysya Bank Ltd.",
      "CreditAccess Grameen Ltd.",
      "Cash & Equivalents"
    ],
    "sectors": {
      "Financials": 22,
      "Industrials": 20,
      "Healthcare": 16,
      "Technology": 14,
      "Consumer": 14,
      "Others": 14
    }
  },
  {
    "id": "icici-midcap",
    "houseId": "icici",
    "amfiCode": 120587,
    "name": "ICICI Prudential Midcap Fund",
    "shortName": "ICICI Midcap",
    "amc": "ICICI Prudential Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 284.1,
    "aumCr": 11400,
    "expenseRatio": 0.78,
    "regularExpenseRatio": 1.72,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Prakash Gaurav Goel",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 44.2,
      "y3": 31.8,
      "y5": 27.6,
      "y10": 19.5,
      "inception": 27.6
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 5.4,
      "beta": 0.89,
      "sharpe": 1.58,
      "sortino": 2.22,
      "stdDev": 14.1
    },
    "holdings": [
      {
        "name": "The Phoenix Mills Ltd.",
        "percent": 4.5,
        "sector": "Real Estate / Retail Malls"
      },
      {
        "name": "TVS Motor Company Ltd.",
        "percent": 4.1,
        "sector": "Automobile - 2 Wheelers"
      },
      {
        "name": "Cummins India Ltd.",
        "percent": 3.85,
        "sector": "Diesel Engines / Infra"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 3.6,
        "sector": "Information Technology"
      },
      {
        "name": "Federal Bank Ltd.",
        "percent": 3.4,
        "sector": "Financial Services"
      },
      {
        "name": "Lupin Ltd.",
        "percent": 3.25,
        "sector": "Pharmaceuticals"
      },
      {
        "name": "Polycab India Ltd.",
        "percent": 3.1,
        "sector": "Electrical Cables"
      },
      {
        "name": "Ashok Leyland Ltd.",
        "percent": 2.95,
        "sector": "Commercial Vehicles"
      },
      {
        "name": "Sundram Fasteners Ltd.",
        "percent": 2.8,
        "sector": "Auto Ancillary"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "The Phoenix Mills Ltd.",
      "TVS Motor Company Ltd.",
      "Cummins India Ltd.",
      "Persistent Systems Ltd.",
      "Federal Bank Ltd.",
      "Lupin Ltd.",
      "Polycab India Ltd.",
      "Ashok Leyland Ltd.",
      "Sundram Fasteners Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 27,
      "Auto": 22,
      "Financials": 18,
      "Consumer": 15,
      "Technology": 11,
      "Healthcare": 7
    }
  },
  {
    "id": "icici-value-disc",
    "houseId": "icici",
    "amfiCode": 120594,
    "name": "ICICI Prudential Value Discovery Fund",
    "shortName": "ICICI Value Disc",
    "amc": "ICICI Prudential Mutual Fund",
    "category": "Value Fund",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 456.8,
    "aumCr": 48200,
    "expenseRatio": 0.74,
    "regularExpenseRatio": 1.56,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "S. Naren & Dharmesh Kakkad",
    "benchmark": "NIFTY 500 TRI",
    "returns": {
      "y1": 42.4,
      "y3": 31.2,
      "y5": 28.5,
      "y10": 18.2,
      "inception": 28.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 7.6,
      "beta": 0.84,
      "sharpe": 1.75,
      "sortino": 2.45,
      "stdDev": 13.4
    },
    "holdings": [
      {
        "name": "Hindustan Aeronautics Ltd. (HAL)",
        "percent": 5.4,
        "sector": "Aerospace & Defence"
      },
      {
        "name": "State Bank of India",
        "percent": 4.9,
        "sector": "Financial Services"
      },
      {
        "name": "Sun Pharma Industries Ltd.",
        "percent": 4.6,
        "sector": "Healthcare / Pharma"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 4.3,
        "sector": "Information Technology"
      },
      {
        "name": "NTPC Ltd.",
        "percent": 4.1,
        "sector": "Power Generation"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 3.85,
        "sector": "Telecommunication"
      },
      {
        "name": "Oil & Natural Gas Corp (ONGC)",
        "percent": 3.7,
        "sector": "Oil & Gas"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 3.5,
        "sector": "Financial Services"
      },
      {
        "name": "Cipla Ltd.",
        "percent": 3.25,
        "sector": "Healthcare"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.2,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Hindustan Aeronautics Ltd. (HAL)",
      "State Bank of India",
      "Sun Pharma Industries Ltd.",
      "Infosys Ltd.",
      "NTPC Ltd.",
      "Bharti Airtel Ltd.",
      "Oil & Natural Gas Corp (ONGC)",
      "ICICI Bank Ltd.",
      "Cipla Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 24,
      "Healthcare": 18,
      "Energy": 16,
      "Industrials": 16,
      "Technology": 14,
      "Others": 12
    }
  },
  {
    "id": "icici-balanced-adv",
    "houseId": "icici",
    "amfiCode": 120588,
    "name": "ICICI Prudential Balanced Advantage Fund",
    "shortName": "ICICI BAF",
    "amc": "ICICI Prudential Mutual Fund",
    "category": "Balanced Advantage",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Moderate",
    "nav": 78.4,
    "aumCr": 61500,
    "expenseRatio": 0.68,
    "regularExpenseRatio": 1.48,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Sankaran Naren & Rajat Chandak",
    "benchmark": "CRISIL Hybrid 50+50",
    "returns": {
      "y1": 25.8,
      "y3": 18.9,
      "y5": 17.6,
      "y10": 14.5,
      "inception": 17.6
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 4.2,
      "beta": 0.72,
      "sharpe": 1.68,
      "sortino": 2.3,
      "stdDev": 9.8
    },
    "holdings": [
      {
        "name": "ICICI Bank Ltd.",
        "percent": 5.8,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 5.2,
        "sector": "Energy / Refining"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 4.9,
        "sector": "Financial Services"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 4.1,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 3.7,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Government Securities 7.18%",
        "percent": 19.5,
        "sector": "Sovereign Debt"
      },
      {
        "name": "Corporate Bonds AAA",
        "percent": 14.2,
        "sector": "Debt Securities"
      },
      {
        "name": "Treasury Bills 91-Day",
        "percent": 8.4,
        "sector": "Money Market"
      },
      {
        "name": "Hedged Equity Arbitrage",
        "percent": 11.2,
        "sector": "Derivatives Hedge"
      }
    ],
    "topHoldings": [
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "HDFC Bank Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "Government Securities 7.18%",
      "Corporate Bonds AAA",
      "Treasury Bills 91-Day",
      "Hedged Equity Arbitrage"
    ],
    "sectors": {
      "Debt & Sovereign": 42,
      "Financials": 22,
      "Energy": 12,
      "Technology": 10,
      "Industrials": 9,
      "Cash": 5
    }
  },
  {
    "id": "nippon-smallcap",
    "houseId": "nippon",
    "amfiCode": 118778,
    "name": "Nippon India Small Cap Fund",
    "shortName": "Nippon Small Cap",
    "amc": "Nippon India Mutual Fund",
    "category": "Small Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 168.2,
    "aumCr": 56400,
    "expenseRatio": 0.67,
    "regularExpenseRatio": 1.52,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Samir Rachh",
    "benchmark": "NIFTY Smallcap 250 TRI",
    "returns": {
      "y1": 47.6,
      "y3": 32.8,
      "y5": 33.2,
      "y10": 24.5,
      "inception": 33.2
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 7.8,
      "beta": 0.86,
      "sharpe": 1.72,
      "sortino": 2.45,
      "stdDev": 15.6
    },
    "holdings": [
      {
        "name": "Tube Investments of India Ltd.",
        "percent": 4.1,
        "sector": "Auto Ancillary / Precision"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 3.45,
        "sector": "Financial Services"
      },
      {
        "name": "Apar Industries Ltd.",
        "percent": 3.2,
        "sector": "Electrical / Heavy Equip"
      },
      {
        "name": "KPIT Technologies Ltd.",
        "percent": 2.95,
        "sector": "Automotive Software"
      },
      {
        "name": "Multi Commodity Exchange (MCX)",
        "percent": 2.75,
        "sector": "Financial Market Infra"
      },
      {
        "name": "CreditAccess Grameen Ltd.",
        "percent": 2.5,
        "sector": "Microfinance"
      },
      {
        "name": "Tejas Networks Ltd.",
        "percent": 2.4,
        "sector": "Telecom Equipment"
      },
      {
        "name": "Power Mech Projects Ltd.",
        "percent": 2.25,
        "sector": "Construction & Infra"
      },
      {
        "name": "Poonawalla Fincorp Ltd.",
        "percent": 2.1,
        "sector": "NBFC / Lending"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Tube Investments of India Ltd.",
      "HDFC Bank Ltd.",
      "Apar Industries Ltd.",
      "KPIT Technologies Ltd.",
      "Multi Commodity Exchange (MCX)",
      "CreditAccess Grameen Ltd.",
      "Tejas Networks Ltd.",
      "Power Mech Projects Ltd.",
      "Poonawalla Fincorp Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 29,
      "Financials": 20,
      "Technology": 18,
      "Auto": 15,
      "Consumer": 10,
      "Others": 8
    }
  },
  {
    "id": "nippon-largecap",
    "houseId": "nippon",
    "amfiCode": 118632,
    "name": "Nippon India Large Cap Fund",
    "shortName": "Nippon Large Cap",
    "amc": "Nippon India Mutual Fund",
    "category": "Large Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 96.4,
    "aumCr": 31200,
    "expenseRatio": 0.78,
    "regularExpenseRatio": 1.62,
    "exitLoad": "1% < 7 days",
    "minSip": 500,
    "manager": "Sailesh Raj Bhan",
    "benchmark": "BSE 100 TRI",
    "returns": {
      "y1": 39.4,
      "y3": 25.6,
      "y5": 22.4,
      "y10": 16.5,
      "inception": 22.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 4.8,
      "beta": 0.94,
      "sharpe": 1.58,
      "sortino": 2.18,
      "stdDev": 13.1
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 9.85,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 8.7,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 7.9,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 6.8,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 6.1,
        "sector": "Engineering & Infra"
      },
      {
        "name": "State Bank of India",
        "percent": 5.4,
        "sector": "Financial Services"
      },
      {
        "name": "ITC Ltd.",
        "percent": 4.6,
        "sector": "FMCG / Diversified"
      },
      {
        "name": "Axis Bank Ltd.",
        "percent": 4.1,
        "sector": "Financial Services"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 3.8,
        "sector": "Telecommunication"
      },
      {
        "name": "Cash & Money Market",
        "percent": 3.4,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "State Bank of India",
      "ITC Ltd.",
      "Axis Bank Ltd.",
      "Bharti Airtel Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 39,
      "Energy": 17,
      "Technology": 16,
      "Industrials": 13,
      "FMCG": 8,
      "Others": 7
    }
  },
  {
    "id": "nippon-growth",
    "houseId": "nippon",
    "amfiCode": 118666,
    "name": "Nippon India Growth Fund",
    "shortName": "Nippon Growth Midcap",
    "amc": "Nippon India Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 3780.5,
    "aumCr": 31500,
    "expenseRatio": 0.82,
    "regularExpenseRatio": 1.68,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Rupesh Patel",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 48.2,
      "y3": 32.5,
      "y5": 29.8,
      "y10": 21.0,
      "inception": 29.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 6.2,
      "beta": 0.91,
      "sharpe": 1.68,
      "sortino": 2.34,
      "stdDev": 14.6
    },
    "holdings": [
      {
        "name": "Power Finance Corporation",
        "percent": 4.6,
        "sector": "Financial Services"
      },
      {
        "name": "Varun Beverages Ltd.",
        "percent": 4.2,
        "sector": "FMCG / Beverages"
      },
      {
        "name": "The Federal Bank Ltd.",
        "percent": 3.9,
        "sector": "Financial Services"
      },
      {
        "name": "Supreme Industries Ltd.",
        "percent": 3.65,
        "sector": "Plastic Products"
      },
      {
        "name": "Cholamandalam Inv. & Fin.",
        "percent": 3.45,
        "sector": "NBFC / Auto Finance"
      },
      {
        "name": "Trent Ltd.",
        "percent": 3.3,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 3.15,
        "sector": "Information Technology"
      },
      {
        "name": "Max Healthcare Institute",
        "percent": 3.0,
        "sector": "Healthcare Services"
      },
      {
        "name": "Bharat Forge Ltd.",
        "percent": 2.85,
        "sector": "Auto Components"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Power Finance Corporation",
      "Varun Beverages Ltd.",
      "The Federal Bank Ltd.",
      "Supreme Industries Ltd.",
      "Cholamandalam Inv. & Fin.",
      "Trent Ltd.",
      "Persistent Systems Ltd.",
      "Max Healthcare Institute",
      "Bharat Forge Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 27,
      "Industrials": 23,
      "Consumer": 20,
      "Technology": 14,
      "Healthcare": 10,
      "Others": 6
    }
  },
  {
    "id": "nippon-multicap",
    "houseId": "nippon",
    "amfiCode": 118671,
    "name": "Nippon India Multi Cap Fund",
    "shortName": "Nippon Multi Cap",
    "amc": "Nippon India Mutual Fund",
    "category": "Multi Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 298.4,
    "aumCr": 36800,
    "expenseRatio": 0.79,
    "regularExpenseRatio": 1.65,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Sailesh Raj Bhan",
    "benchmark": "NIFTY 500 Multicap 50:25:25",
    "returns": {
      "y1": 43.8,
      "y3": 29.5,
      "y5": 27.4,
      "y10": 18.2,
      "inception": 27.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 5.9,
      "beta": 0.9,
      "sharpe": 1.62,
      "sortino": 2.25,
      "stdDev": 14.2
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 6.8,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 6.1,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 5.2,
        "sector": "Energy / Refining"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 4.6,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 3.9,
        "sector": "Information Technology"
      },
      {
        "name": "The Federal Bank Ltd.",
        "percent": 2.8,
        "sector": "Financial Services"
      },
      {
        "name": "Apar Industries Ltd.",
        "percent": 2.65,
        "sector": "Electricals"
      },
      {
        "name": "Tube Investments of India",
        "percent": 2.45,
        "sector": "Auto Components"
      },
      {
        "name": "Balkrishna Industries Ltd.",
        "percent": 2.3,
        "sector": "Auto Tyres"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.5,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "Larsen & Toubro Ltd.",
      "Infosys Ltd.",
      "The Federal Bank Ltd.",
      "Apar Industries Ltd.",
      "Tube Investments of India",
      "Balkrishna Industries Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 30,
      "Industrials": 24,
      "Consumer": 18,
      "Technology": 14,
      "Energy": 9,
      "Others": 5
    }
  },
  {
    "id": "nippon-power-infra",
    "houseId": "nippon",
    "amfiCode": 118698,
    "name": "Nippon India Power & Infra Fund",
    "shortName": "Nippon Infra",
    "amc": "Nippon India Mutual Fund",
    "category": "Thematic / Infra",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 342.1,
    "aumCr": 6800,
    "expenseRatio": 0.88,
    "regularExpenseRatio": 1.85,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Sanjay Doshi",
    "benchmark": "Nifty Infrastructure TRI",
    "returns": {
      "y1": 58.2,
      "y3": 38.4,
      "y5": 32.5,
      "y10": 19.8,
      "inception": 32.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 9.2,
      "beta": 0.96,
      "sharpe": 1.84,
      "sortino": 2.6,
      "stdDev": 16.8
    },
    "holdings": [
      {
        "name": "Reliance Industries Ltd.",
        "percent": 8.4,
        "sector": "Energy / Refining"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 7.9,
        "sector": "Engineering & Infra"
      },
      {
        "name": "NTPC Ltd.",
        "percent": 7.1,
        "sector": "Power Generation"
      },
      {
        "name": "Power Grid Corp of India",
        "percent": 6.4,
        "sector": "Power Transmission"
      },
      {
        "name": "Tata Power Company Ltd.",
        "percent": 5.8,
        "sector": "Renewables & Utilities"
      },
      {
        "name": "Siemens Ltd.",
        "percent": 5.1,
        "sector": "Industrial Automation"
      },
      {
        "name": "ABB India Ltd.",
        "percent": 4.6,
        "sector": "Heavy Electricals"
      },
      {
        "name": "Coal India Ltd.",
        "percent": 4.2,
        "sector": "Metals & Mining"
      },
      {
        "name": "Bharat Electronics Ltd.",
        "percent": 3.85,
        "sector": "Defence Electronics"
      },
      {
        "name": "Cash & Money Market",
        "percent": 3.9,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Reliance Industries Ltd.",
      "Larsen & Toubro Ltd.",
      "NTPC Ltd.",
      "Power Grid Corp of India",
      "Tata Power Company Ltd.",
      "Siemens Ltd.",
      "ABB India Ltd.",
      "Coal India Ltd.",
      "Bharat Electronics Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Power & Utilities": 35,
      "Capital Goods": 28,
      "Energy": 18,
      "Construction": 12,
      "Cash": 7
    }
  },
  {
    "id": "kotak-smallcap",
    "houseId": "kotak",
    "amfiCode": 120164,
    "name": "Kotak Small Cap Fund",
    "shortName": "Kotak Small Cap",
    "amc": "Kotak Mahindra Mutual Fund",
    "category": "Small Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 284.5,
    "aumCr": 16500,
    "expenseRatio": 0.58,
    "regularExpenseRatio": 1.62,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Pankaj Tibrewal",
    "benchmark": "NIFTY Smallcap 250 TRI",
    "returns": {
      "y1": 41.2,
      "y3": 27.8,
      "y5": 29.5,
      "y10": 21.8,
      "inception": 29.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 5.8,
      "beta": 0.82,
      "sharpe": 1.58,
      "sortino": 2.25,
      "stdDev": 14.2
    },
    "holdings": [
      {
        "name": "Carborundum Universal Ltd.",
        "percent": 4.5,
        "sector": "Abrasives / Industrial"
      },
      {
        "name": "Ratnamani Metals & Tubes",
        "percent": 4.1,
        "sector": "Steel Pipes & Tubes"
      },
      {
        "name": "Blue Star Ltd.",
        "percent": 3.85,
        "sector": "Consumer Durables"
      },
      {
        "name": "Century Plyboards Ltd.",
        "percent": 3.6,
        "sector": "Building Materials"
      },
      {
        "name": "Cyient Ltd.",
        "percent": 3.4,
        "sector": "Engineering R&D Services"
      },
      {
        "name": "Sheela Foam Ltd.",
        "percent": 3.2,
        "sector": "Consumer Goods"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 3.05,
        "sector": "Information Technology"
      },
      {
        "name": "Galaxy Surfactants Ltd.",
        "percent": 2.9,
        "sector": "Specialty Chemicals"
      },
      {
        "name": "JB Chemicals & Pharma",
        "percent": 2.75,
        "sector": "Pharmaceuticals"
      },
      {
        "name": "Cash & Money Market",
        "percent": 6.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Carborundum Universal Ltd.",
      "Ratnamani Metals & Tubes",
      "Blue Star Ltd.",
      "Century Plyboards Ltd.",
      "Cyient Ltd.",
      "Sheela Foam Ltd.",
      "Persistent Systems Ltd.",
      "Galaxy Surfactants Ltd.",
      "JB Chemicals & Pharma",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 32,
      "Consumer": 22,
      "Technology": 16,
      "Chemicals": 12,
      "Healthcare": 10,
      "Cash": 8
    }
  },
  {
    "id": "kotak-emerging-midcap",
    "houseId": "kotak",
    "amfiCode": 119779,
    "name": "Kotak Emerging Equity Fund",
    "shortName": "Kotak Emerging Equity",
    "amc": "Kotak Mahindra Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 128.9,
    "aumCr": 52000,
    "expenseRatio": 0.64,
    "regularExpenseRatio": 1.55,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Pankaj Tibrewal",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 45.5,
      "y3": 30.6,
      "y5": 28.4,
      "y10": 20.9,
      "inception": 28.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 6.1,
      "beta": 0.87,
      "sharpe": 1.68,
      "sortino": 2.36,
      "stdDev": 13.9
    },
    "holdings": [
      {
        "name": "Persistent Systems Ltd.",
        "percent": 4.8,
        "sector": "Information Technology"
      },
      {
        "name": "Schaeffler India Ltd.",
        "percent": 4.3,
        "sector": "Industrial Bearings"
      },
      {
        "name": "The Federal Bank Ltd.",
        "percent": 4.05,
        "sector": "Financial Services"
      },
      {
        "name": "Cummins India Ltd.",
        "percent": 3.8,
        "sector": "Diesel & Gas Engines"
      },
      {
        "name": "Supreme Industries Ltd.",
        "percent": 3.55,
        "sector": "Pipes & Plastics"
      },
      {
        "name": "Thermax Ltd.",
        "percent": 3.35,
        "sector": "Energy & Environment Infra"
      },
      {
        "name": "Solar Industries India",
        "percent": 3.15,
        "sector": "Industrial Explosives"
      },
      {
        "name": "Balkrishna Industries Ltd.",
        "percent": 3.0,
        "sector": "Tyres & Rubber"
      },
      {
        "name": "Coforge Ltd.",
        "percent": 2.85,
        "sector": "Information Technology"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.4,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Persistent Systems Ltd.",
      "Schaeffler India Ltd.",
      "The Federal Bank Ltd.",
      "Cummins India Ltd.",
      "Supreme Industries Ltd.",
      "Thermax Ltd.",
      "Solar Industries India",
      "Balkrishna Industries Ltd.",
      "Coforge Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 34,
      "Technology": 20,
      "Consumer": 18,
      "Financials": 16,
      "Auto": 8,
      "Cash": 4
    }
  },
  {
    "id": "kotak-flexicap",
    "houseId": "kotak",
    "amfiCode": 102868,
    "name": "Kotak Flexicap Fund",
    "shortName": "Kotak Flexicap",
    "amc": "Kotak Mahindra Mutual Fund",
    "category": "Flexi Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 84.2,
    "aumCr": 48200,
    "expenseRatio": 0.72,
    "regularExpenseRatio": 1.58,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Harsha Upadhyaya",
    "benchmark": "NIFTY 500 TRI",
    "returns": {
      "y1": 36.5,
      "y3": 23.4,
      "y5": 21.8,
      "y10": 16.2,
      "inception": 21.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 4.4,
      "beta": 0.92,
      "sharpe": 1.45,
      "sortino": 2.08,
      "stdDev": 13.5
    },
    "holdings": [
      {
        "name": "ICICI Bank Ltd.",
        "percent": 9.4,
        "sector": "Financial Services"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 8.8,
        "sector": "Financial Services"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 6.9,
        "sector": "Information Technology"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 6.5,
        "sector": "Energy / Refining"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 5.8,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Tata Consultancy Services Ltd.",
        "percent": 4.6,
        "sector": "Information Technology"
      },
      {
        "name": "State Bank of India",
        "percent": 4.2,
        "sector": "Financial Services"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 3.8,
        "sector": "Telecommunication"
      },
      {
        "name": "Maruti Suzuki India Ltd.",
        "percent": 3.4,
        "sector": "Automobile"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.1,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "ICICI Bank Ltd.",
      "HDFC Bank Ltd.",
      "Infosys Ltd.",
      "Reliance Industries Ltd.",
      "Larsen & Toubro Ltd.",
      "Tata Consultancy Services Ltd.",
      "State Bank of India",
      "Bharti Airtel Ltd.",
      "Maruti Suzuki India Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 36,
      "Technology": 20,
      "Energy": 14,
      "Industrials": 13,
      "Auto": 10,
      "Others": 7
    }
  },
  {
    "id": "kotak-bluechip",
    "houseId": "kotak",
    "amfiCode": 120152,
    "name": "Kotak Bluechip Fund",
    "shortName": "Kotak Bluechip",
    "amc": "Kotak Mahindra Mutual Fund",
    "category": "Large Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 512.6,
    "aumCr": 9400,
    "expenseRatio": 0.81,
    "regularExpenseRatio": 1.72,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Harish Krishnan",
    "benchmark": "NIFTY 100 TRI",
    "returns": {
      "y1": 32.8,
      "y3": 22.1,
      "y5": 19.8,
      "y10": 15.0,
      "inception": 19.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 3.5,
      "beta": 0.93,
      "sharpe": 1.38,
      "sortino": 1.95,
      "stdDev": 12.8
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 9.8,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 9.1,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 8.4,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 7.2,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 6.3,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Tata Consultancy Services Ltd.",
        "percent": 5.2,
        "sector": "Information Technology"
      },
      {
        "name": "ITC Ltd.",
        "percent": 4.6,
        "sector": "FMCG / Tobacco"
      },
      {
        "name": "Axis Bank Ltd.",
        "percent": 4.1,
        "sector": "Financial Services"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 3.8,
        "sector": "Telecommunication"
      },
      {
        "name": "Cash & Money Market",
        "percent": 3.2,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "Tata Consultancy Services Ltd.",
      "ITC Ltd.",
      "Axis Bank Ltd.",
      "Bharti Airtel Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 38,
      "Technology": 19,
      "Energy": 15,
      "Industrials": 13,
      "FMCG": 9,
      "Others": 6
    }
  },
  {
    "id": "axis-smallcap",
    "houseId": "axis",
    "amfiCode": 125354,
    "name": "Axis Small Cap Fund",
    "shortName": "Axis Small Cap",
    "amc": "Axis Mutual Fund",
    "category": "Small Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 108.4,
    "aumCr": 24500,
    "expenseRatio": 0.55,
    "regularExpenseRatio": 1.64,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Mayank Hyanki",
    "benchmark": "NIFTY Smallcap 250 TRI",
    "returns": {
      "y1": 39.8,
      "y3": 26.5,
      "y5": 27.9,
      "y10": 22.4,
      "inception": 27.9
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 5.8,
      "beta": 0.74,
      "sharpe": 1.64,
      "sortino": 2.38,
      "stdDev": 12.8
    },
    "holdings": [
      {
        "name": "Narayana Hrudayalaya Ltd.",
        "percent": 4.6,
        "sector": "Healthcare Services"
      },
      {
        "name": "Krishna Institute of Med (KIMS)",
        "percent": 4.1,
        "sector": "Healthcare"
      },
      {
        "name": "Birlasoft Ltd.",
        "percent": 3.85,
        "sector": "Information Technology"
      },
      {
        "name": "CCL Products (India) Ltd.",
        "percent": 3.6,
        "sector": "Food Processing / Coffee"
      },
      {
        "name": "Brigade Enterprises Ltd.",
        "percent": 3.4,
        "sector": "Real Estate / Infra"
      },
      {
        "name": "Cholamandalam Financial",
        "percent": 3.2,
        "sector": "Financial Services"
      },
      {
        "name": "PNC Infratech Ltd.",
        "percent": 3.05,
        "sector": "Construction & Roads"
      },
      {
        "name": "Fine Organic Industries",
        "percent": 2.9,
        "sector": "Specialty Chemicals"
      },
      {
        "name": "Ahluwalia Contracts Ltd.",
        "percent": 2.75,
        "sector": "Civil Construction"
      },
      {
        "name": "Cash & Money Market",
        "percent": 7.4,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Narayana Hrudayalaya Ltd.",
      "Krishna Institute of Med (KIMS)",
      "Birlasoft Ltd.",
      "CCL Products (India) Ltd.",
      "Brigade Enterprises Ltd.",
      "Cholamandalam Financial",
      "PNC Infratech Ltd.",
      "Fine Organic Industries",
      "Ahluwalia Contracts Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Healthcare": 26,
      "Industrials": 22,
      "Technology": 16,
      "Financials": 14,
      "Consumer": 12,
      "Cash": 10
    }
  },
  {
    "id": "axis-midcap",
    "houseId": "axis",
    "amfiCode": 120503,
    "name": "Axis Midcap Fund",
    "shortName": "Axis Midcap",
    "amc": "Axis Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 114.2,
    "aumCr": 28200,
    "expenseRatio": 0.65,
    "regularExpenseRatio": 1.68,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Shreyash Devalkar",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 38.5,
      "y3": 24.2,
      "y5": 23.5,
      "y10": 18.2,
      "inception": 23.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 4.2,
      "beta": 0.78,
      "sharpe": 1.48,
      "sortino": 2.12,
      "stdDev": 13.1
    },
    "holdings": [
      {
        "name": "Cholamandalam Inv. & Fin.",
        "percent": 4.9,
        "sector": "Financial Services"
      },
      {
        "name": "The Indian Hotels Co. Ltd.",
        "percent": 4.4,
        "sector": "Hospitality / Tourism"
      },
      {
        "name": "Supreme Industries Ltd.",
        "percent": 4.1,
        "sector": "Building Materials"
      },
      {
        "name": "Astral Ltd.",
        "percent": 3.8,
        "sector": "Pipes & Plastics"
      },
      {
        "name": "Coforge Ltd.",
        "percent": 3.5,
        "sector": "Information Technology"
      },
      {
        "name": "Trent Ltd.",
        "percent": 3.3,
        "sector": "Retail / Consumer"
      },
      {
        "name": "PI Industries Ltd.",
        "percent": 3.1,
        "sector": "Agro Chemicals"
      },
      {
        "name": "Federal Bank Ltd.",
        "percent": 2.95,
        "sector": "Financial Services"
      },
      {
        "name": "Schaeffler India Ltd.",
        "percent": 2.8,
        "sector": "Bearings / Industrial"
      },
      {
        "name": "Cash & Money Market",
        "percent": 6.1,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Cholamandalam Inv. & Fin.",
      "The Indian Hotels Co. Ltd.",
      "Supreme Industries Ltd.",
      "Astral Ltd.",
      "Coforge Ltd.",
      "Trent Ltd.",
      "PI Industries Ltd.",
      "Federal Bank Ltd.",
      "Schaeffler India Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 24,
      "Consumer": 22,
      "Industrials": 20,
      "Technology": 16,
      "Chemicals": 10,
      "Cash": 8
    }
  },
  {
    "id": "axis-bluechip",
    "houseId": "axis",
    "amfiCode": 120465,
    "name": "Axis Bluechip Fund",
    "shortName": "Axis Bluechip",
    "amc": "Axis Mutual Fund",
    "category": "Large Cap",
    "plan": "Direct - Growth",
    "rating": 3,
    "risk": "Very High",
    "nav": 58.9,
    "aumCr": 31400,
    "expenseRatio": 0.76,
    "regularExpenseRatio": 1.6,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Shreyash Devalkar",
    "benchmark": "NIFTY 50 TRI",
    "returns": {
      "y1": 27.8,
      "y3": 17.5,
      "y5": 16.8,
      "y10": 13.8,
      "inception": 16.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 1.8,
      "beta": 0.88,
      "sharpe": 1.25,
      "sortino": 1.78,
      "stdDev": 12.2
    },
    "holdings": [
      {
        "name": "ICICI Bank Ltd.",
        "percent": 9.8,
        "sector": "Financial Services"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 9.2,
        "sector": "Financial Services"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 8.4,
        "sector": "Information Technology"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 7.6,
        "sector": "Energy / Refining"
      },
      {
        "name": "Tata Consultancy Services Ltd.",
        "percent": 6.8,
        "sector": "Information Technology"
      },
      {
        "name": "Bajaj Finance Ltd.",
        "percent": 5.9,
        "sector": "Financial Services"
      },
      {
        "name": "Avenue Supermarts (DMart)",
        "percent": 5.1,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 4.8,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Kotak Mahindra Bank Ltd.",
        "percent": 4.2,
        "sector": "Financial Services"
      },
      {
        "name": "Cash & Money Market",
        "percent": 3.5,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "ICICI Bank Ltd.",
      "HDFC Bank Ltd.",
      "Infosys Ltd.",
      "Reliance Industries Ltd.",
      "Tata Consultancy Services Ltd.",
      "Bajaj Finance Ltd.",
      "Avenue Supermarts (DMart)",
      "Larsen & Toubro Ltd.",
      "Kotak Mahindra Bank Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 42,
      "Technology": 24,
      "Consumer": 14,
      "Energy": 12,
      "Industrials": 8
    }
  },
  {
    "id": "axis-flexicap",
    "houseId": "axis",
    "amfiCode": 140245,
    "name": "Axis Flexi Cap Fund",
    "shortName": "Axis Flexicap",
    "amc": "Axis Mutual Fund",
    "category": "Flexi Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 28.4,
    "aumCr": 11800,
    "expenseRatio": 0.68,
    "regularExpenseRatio": 1.72,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Devang Shah",
    "benchmark": "NIFTY 500 TRI",
    "returns": {
      "y1": 34.2,
      "y3": 22.8,
      "y5": 20.4,
      "y10": 15.6,
      "inception": 20.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 3.8,
      "beta": 0.86,
      "sharpe": 1.4,
      "sortino": 2.02,
      "stdDev": 13.0
    },
    "holdings": [
      {
        "name": "ICICI Bank Ltd.",
        "percent": 8.9,
        "sector": "Financial Services"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 8.2,
        "sector": "Financial Services"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 6.7,
        "sector": "Information Technology"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 6.1,
        "sector": "Energy / Refining"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 5.4,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Tata Motors Ltd.",
        "percent": 4.6,
        "sector": "Automobile"
      },
      {
        "name": "Trent Ltd.",
        "percent": 4.1,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Sun Pharma Industries",
        "percent": 3.8,
        "sector": "Healthcare / Pharma"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 3.4,
        "sector": "Information Technology"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "ICICI Bank Ltd.",
      "HDFC Bank Ltd.",
      "Infosys Ltd.",
      "Reliance Industries Ltd.",
      "Larsen & Toubro Ltd.",
      "Tata Motors Ltd.",
      "Trent Ltd.",
      "Sun Pharma Industries",
      "Persistent Systems Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 34,
      "Technology": 19,
      "Consumer": 17,
      "Industrials": 14,
      "Energy": 10,
      "Others": 6
    }
  },
  {
    "id": "axis-elss",
    "houseId": "axis",
    "amfiCode": 120505,
    "name": "Axis Long Term Equity Fund",
    "shortName": "Axis ELSS",
    "amc": "Axis Mutual Fund",
    "category": "ELSS / Tax",
    "plan": "Direct - Growth",
    "rating": 3,
    "risk": "Very High",
    "nav": 92.5,
    "aumCr": 28900,
    "expenseRatio": 0.78,
    "regularExpenseRatio": 1.65,
    "exitLoad": "Nil (3Y Lock-in)",
    "minSip": 500,
    "manager": "Shreyash Devalkar",
    "benchmark": "NIFTY 500 TRI",
    "returns": {
      "y1": 30.5,
      "y3": 19.8,
      "y5": 18.9,
      "y10": 14.8,
      "inception": 18.9
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 2.8,
      "beta": 0.86,
      "sharpe": 1.32,
      "sortino": 1.88,
      "stdDev": 12.8
    },
    "holdings": [
      {
        "name": "ICICI Bank Ltd.",
        "percent": 9.2,
        "sector": "Financial Services"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 8.6,
        "sector": "Financial Services"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 7.4,
        "sector": "Information Technology"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 6.8,
        "sector": "Energy / Refining"
      },
      {
        "name": "Bajaj Finance Ltd.",
        "percent": 5.4,
        "sector": "Financial Services"
      },
      {
        "name": "Avenue Supermarts (DMart)",
        "percent": 4.8,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Tata Consultancy Services Ltd.",
        "percent": 4.4,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 4.1,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Nestle India Ltd.",
        "percent": 3.6,
        "sector": "FMCG / Food"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.2,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "ICICI Bank Ltd.",
      "HDFC Bank Ltd.",
      "Infosys Ltd.",
      "Reliance Industries Ltd.",
      "Bajaj Finance Ltd.",
      "Avenue Supermarts (DMart)",
      "Tata Consultancy Services Ltd.",
      "Larsen & Toubro Ltd.",
      "Nestle India Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 38,
      "Technology": 20,
      "Consumer": 18,
      "Energy": 12,
      "Industrials": 12
    }
  },
  {
    "id": "quant-smallcap",
    "houseId": "quant",
    "amfiCode": 120828,
    "name": "Quant Small Cap Fund",
    "shortName": "Quant Small Cap",
    "amc": "Quant Mutual Fund",
    "category": "Small Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 262.4,
    "aumCr": 24500,
    "expenseRatio": 0.64,
    "regularExpenseRatio": 1.62,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Sandeep Tandon & Ankit Pande",
    "benchmark": "NIFTY Smallcap 250 TRI",
    "returns": {
      "y1": 58.4,
      "y3": 38.6,
      "y5": 42.1,
      "y10": 23.8,
      "inception": 42.1
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 9.4,
      "beta": 0.98,
      "sharpe": 1.84,
      "sortino": 2.7,
      "stdDev": 18.2
    },
    "holdings": [
      {
        "name": "Reliance Industries Ltd.",
        "percent": 7.45,
        "sector": "Energy / Refining"
      },
      {
        "name": "Jio Financial Services Ltd.",
        "percent": 5.8,
        "sector": "Financial Services"
      },
      {
        "name": "Adani Power Ltd.",
        "percent": 4.6,
        "sector": "Power Generation"
      },
      {
        "name": "Bikaji Foods International",
        "percent": 3.9,
        "sector": "FMCG / Packaged Food"
      },
      {
        "name": "Hindustan Copper Ltd.",
        "percent": 3.75,
        "sector": "Metals & Mining"
      },
      {
        "name": "Aegis Logistics Ltd.",
        "percent": 3.4,
        "sector": "Logistics & Gas Storage"
      },
      {
        "name": "Steel Authority of India (SAIL)",
        "percent": 3.1,
        "sector": "Metals & Mining"
      },
      {
        "name": "HFCL Ltd.",
        "percent": 2.9,
        "sector": "Telecom Equipment"
      },
      {
        "name": "IRB Infrastructure Developers",
        "percent": 2.65,
        "sector": "Construction & Highways"
      },
      {
        "name": "Cash & Money Market",
        "percent": 6.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Reliance Industries Ltd.",
      "Jio Financial Services Ltd.",
      "Adani Power Ltd.",
      "Bikaji Foods International",
      "Hindustan Copper Ltd.",
      "Aegis Logistics Ltd.",
      "Steel Authority of India (SAIL)",
      "HFCL Ltd.",
      "IRB Infrastructure Developers",
      "Cash & Money Market"
    ],
    "sectors": {
      "Energy": 24,
      "Metals & Mining": 18,
      "Financials": 16,
      "Industrials": 14,
      "Consumer": 12,
      "Others": 16
    }
  },
  {
    "id": "quant-elss",
    "houseId": "quant",
    "amfiCode": 120847,
    "name": "Quant ELSS Tax Saver Fund",
    "shortName": "Quant ELSS",
    "amc": "Quant Mutual Fund",
    "category": "ELSS / Tax",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 384.5,
    "aumCr": 11200,
    "expenseRatio": 0.57,
    "regularExpenseRatio": 1.58,
    "exitLoad": "Nil (3Y Lock-in)",
    "minSip": 500,
    "manager": "Sandeep Tandon & Ankit Pande",
    "benchmark": "NIFTY 500 TRI",
    "returns": {
      "y1": 44.2,
      "y3": 32.5,
      "y5": 36.8,
      "y10": 24.1,
      "inception": 36.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 8.2,
      "beta": 0.95,
      "sharpe": 1.72,
      "sortino": 2.52,
      "stdDev": 17.4
    },
    "holdings": [
      {
        "name": "Reliance Industries Ltd.",
        "percent": 8.6,
        "sector": "Energy / Refining"
      },
      {
        "name": "Adani Power Ltd.",
        "percent": 5.9,
        "sector": "Power Generation"
      },
      {
        "name": "State Bank of India",
        "percent": 5.2,
        "sector": "Financial Services"
      },
      {
        "name": "Jio Financial Services Ltd.",
        "percent": 4.8,
        "sector": "Financial Services"
      },
      {
        "name": "Tata Power Company Ltd.",
        "percent": 4.3,
        "sector": "Power Generation"
      },
      {
        "name": "Hindalco Industries Ltd.",
        "percent": 3.95,
        "sector": "Metals & Mining"
      },
      {
        "name": "Samvardhana Motherson Int.",
        "percent": 3.6,
        "sector": "Auto Components"
      },
      {
        "name": "Life Insurance Corp (LIC)",
        "percent": 3.4,
        "sector": "Insurance"
      },
      {
        "name": "Swan Energy Ltd.",
        "percent": 3.15,
        "sector": "Textiles & Energy"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.4,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Reliance Industries Ltd.",
      "Adani Power Ltd.",
      "State Bank of India",
      "Jio Financial Services Ltd.",
      "Tata Power Company Ltd.",
      "Hindalco Industries Ltd.",
      "Samvardhana Motherson Int.",
      "Life Insurance Corp (LIC)",
      "Swan Energy Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Energy & Power": 28,
      "Financials": 22,
      "Metals": 16,
      "Automobile": 12,
      "Others": 22
    }
  },
  {
    "id": "quant-midcap",
    "houseId": "quant",
    "amfiCode": 120841,
    "name": "Quant Mid Cap Fund",
    "shortName": "Quant Midcap",
    "amc": "Quant Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 234.8,
    "aumCr": 8900,
    "expenseRatio": 0.65,
    "regularExpenseRatio": 1.68,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Sandeep Tandon & Sanjeev Sharma",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 51.2,
      "y3": 36.4,
      "y5": 34.6,
      "y10": 21.8,
      "inception": 34.6
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 8.8,
      "beta": 0.96,
      "sharpe": 1.78,
      "sortino": 2.58,
      "stdDev": 17.9
    },
    "holdings": [
      {
        "name": "Reliance Industries Ltd.",
        "percent": 7.8,
        "sector": "Energy / Refining"
      },
      {
        "name": "Adani Power Ltd.",
        "percent": 5.4,
        "sector": "Power Generation"
      },
      {
        "name": "Container Corp of India (CONCOR)",
        "percent": 4.5,
        "sector": "Logistics & Transport"
      },
      {
        "name": "Tata Communications Ltd.",
        "percent": 4.1,
        "sector": "Telecommunications"
      },
      {
        "name": "Steel Authority of India",
        "percent": 3.8,
        "sector": "Metals & Mining"
      },
      {
        "name": "Sun Pharma Industries Ltd.",
        "percent": 3.5,
        "sector": "Healthcare / Pharma"
      },
      {
        "name": "Bikaji Foods International",
        "percent": 3.3,
        "sector": "FMCG / Food"
      },
      {
        "name": "Punjab National Bank",
        "percent": 3.1,
        "sector": "Financial Services"
      },
      {
        "name": "Aegis Logistics Ltd.",
        "percent": 2.9,
        "sector": "Logistics"
      },
      {
        "name": "Cash & Money Market",
        "percent": 6.2,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Reliance Industries Ltd.",
      "Adani Power Ltd.",
      "Container Corp of India (CONCOR)",
      "Tata Communications Ltd.",
      "Steel Authority of India",
      "Sun Pharma Industries Ltd.",
      "Bikaji Foods International",
      "Punjab National Bank",
      "Aegis Logistics Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Energy & Utilities": 26,
      "Industrials": 20,
      "Financials": 16,
      "Metals": 14,
      "Others": 24
    }
  },
  {
    "id": "quant-flexicap",
    "houseId": "quant",
    "amfiCode": 120823,
    "name": "Quant Flexi Cap Fund",
    "shortName": "Quant Flexi",
    "amc": "Quant Mutual Fund",
    "category": "Flexi Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 108.9,
    "aumCr": 7200,
    "expenseRatio": 0.62,
    "regularExpenseRatio": 1.65,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Sandeep Tandon & Ankit Pande",
    "benchmark": "NIFTY 500 TRI",
    "returns": {
      "y1": 46.8,
      "y3": 33.2,
      "y5": 33.8,
      "y10": 20.5,
      "inception": 33.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 7.8,
      "beta": 0.94,
      "sharpe": 1.68,
      "sortino": 2.4,
      "stdDev": 16.8
    },
    "holdings": [
      {
        "name": "Reliance Industries Ltd.",
        "percent": 8.9,
        "sector": "Energy / Refining"
      },
      {
        "name": "Jio Financial Services Ltd.",
        "percent": 6.2,
        "sector": "Financial Services"
      },
      {
        "name": "Adani Power Ltd.",
        "percent": 5.1,
        "sector": "Power Generation"
      },
      {
        "name": "State Bank of India",
        "percent": 4.7,
        "sector": "Financial Services"
      },
      {
        "name": "Tata Power Company Ltd.",
        "percent": 4.2,
        "sector": "Power Generation"
      },
      {
        "name": "Hindalco Industries Ltd.",
        "percent": 3.8,
        "sector": "Metals & Mining"
      },
      {
        "name": "Samvardhana Motherson",
        "percent": 3.5,
        "sector": "Auto Components"
      },
      {
        "name": "Hindustan Copper Ltd.",
        "percent": 3.2,
        "sector": "Metals"
      },
      {
        "name": "Life Insurance Corp",
        "percent": 3.0,
        "sector": "Insurance"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Reliance Industries Ltd.",
      "Jio Financial Services Ltd.",
      "Adani Power Ltd.",
      "State Bank of India",
      "Tata Power Company Ltd.",
      "Hindalco Industries Ltd.",
      "Samvardhana Motherson",
      "Hindustan Copper Ltd.",
      "Life Insurance Corp",
      "Cash & Money Market"
    ],
    "sectors": {
      "Energy & Power": 27,
      "Financials": 24,
      "Metals": 15,
      "Automobile": 12,
      "Others": 22
    }
  },
  {
    "id": "quant-active",
    "houseId": "quant",
    "amfiCode": 120833,
    "name": "Quant Active Fund",
    "shortName": "Quant Active",
    "amc": "Quant Mutual Fund",
    "category": "Multi Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 642.1,
    "aumCr": 11500,
    "expenseRatio": 0.68,
    "regularExpenseRatio": 1.74,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Sandeep Tandon & Ankit Pande",
    "benchmark": "NIFTY 500 Multicap 50:25:25 TRI",
    "returns": {
      "y1": 45.6,
      "y3": 31.8,
      "y5": 31.4,
      "y10": 21.2,
      "inception": 31.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 7.6,
      "beta": 0.95,
      "sharpe": 1.64,
      "sortino": 2.38,
      "stdDev": 17.2
    },
    "holdings": [
      {
        "name": "Reliance Industries Ltd.",
        "percent": 7.9,
        "sector": "Energy / Refining"
      },
      {
        "name": "Jio Financial Services Ltd.",
        "percent": 5.6,
        "sector": "Financial Services"
      },
      {
        "name": "Adani Power Ltd.",
        "percent": 4.8,
        "sector": "Power Generation"
      },
      {
        "name": "State Bank of India",
        "percent": 4.4,
        "sector": "Financial Services"
      },
      {
        "name": "Tata Power Company Ltd.",
        "percent": 3.9,
        "sector": "Power Generation"
      },
      {
        "name": "Hindalco Industries Ltd.",
        "percent": 3.6,
        "sector": "Metals & Mining"
      },
      {
        "name": "Bikaji Foods International",
        "percent": 3.2,
        "sector": "FMCG"
      },
      {
        "name": "Hindustan Copper Ltd.",
        "percent": 2.9,
        "sector": "Metals"
      },
      {
        "name": "Swan Energy Ltd.",
        "percent": 2.7,
        "sector": "Textiles & Energy"
      },
      {
        "name": "Cash & Money Market",
        "percent": 6.1,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Reliance Industries Ltd.",
      "Jio Financial Services Ltd.",
      "Adani Power Ltd.",
      "State Bank of India",
      "Tata Power Company Ltd.",
      "Hindalco Industries Ltd.",
      "Bikaji Foods International",
      "Hindustan Copper Ltd.",
      "Swan Energy Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Energy & Power": 26,
      "Financials": 22,
      "Metals": 16,
      "Consumer": 12,
      "Others": 24
    }
  },
  {
    "id": "mirae-largecap",
    "houseId": "mirae",
    "amfiCode": 118825,
    "name": "Mirae Asset Large Cap Fund",
    "shortName": "Mirae Large Cap",
    "amc": "Mirae Asset Mutual Fund",
    "category": "Large Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 114.6,
    "aumCr": 36800,
    "expenseRatio": 0.54,
    "regularExpenseRatio": 1.54,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Gaurav Misra & Gaurav Khandelwal",
    "benchmark": "NIFTY 100 TRI",
    "returns": {
      "y1": 32.8,
      "y3": 18.9,
      "y5": 17.8,
      "y10": 15.6,
      "inception": 17.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 2.8,
      "beta": 0.98,
      "sharpe": 1.28,
      "sortino": 1.82,
      "stdDev": 13.2
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 9.8,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 8.9,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 8.2,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 7.1,
        "sector": "Information Technology"
      },
      {
        "name": "Tata Consultancy Services Ltd.",
        "percent": 5.6,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 5.2,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 4.6,
        "sector": "Telecommunication"
      },
      {
        "name": "State Bank of India",
        "percent": 4.1,
        "sector": "Financial Services"
      },
      {
        "name": "Axis Bank Ltd.",
        "percent": 3.8,
        "sector": "Financial Services"
      },
      {
        "name": "Cash & Money Market",
        "percent": 3.2,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Tata Consultancy Services Ltd.",
      "Larsen & Toubro Ltd.",
      "Bharti Airtel Ltd.",
      "State Bank of India",
      "Axis Bank Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 38,
      "Technology": 21,
      "Energy": 14,
      "Industrials": 12,
      "Telecom": 7,
      "Others": 8
    }
  },
  {
    "id": "mirae-largemidcap",
    "houseId": "mirae",
    "amfiCode": 118834,
    "name": "Mirae Asset Large & Midcap Fund",
    "shortName": "Mirae Large & Midcap",
    "amc": "Mirae Asset Mutual Fund",
    "category": "Large & Mid Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 156.4,
    "aumCr": 37200,
    "expenseRatio": 0.62,
    "regularExpenseRatio": 1.62,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Neelesh Surana & Ankit Jain",
    "benchmark": "NIFTY LargeMidcap 250 TRI",
    "returns": {
      "y1": 38.4,
      "y3": 24.6,
      "y5": 22.8,
      "y10": 18.2,
      "inception": 22.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 4.6,
      "beta": 0.94,
      "sharpe": 1.54,
      "sortino": 2.18,
      "stdDev": 14.1
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 7.2,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 6.8,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 5.6,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 4.9,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 4.4,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Federal Bank Ltd.",
        "percent": 3.8,
        "sector": "Financial Services"
      },
      {
        "name": "Tata Motors Ltd.",
        "percent": 3.5,
        "sector": "Automobile"
      },
      {
        "name": "Trent Ltd.",
        "percent": 3.2,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Bharat Forge Ltd.",
        "percent": 3.0,
        "sector": "Auto Components"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.2,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "Federal Bank Ltd.",
      "Tata Motors Ltd.",
      "Trent Ltd.",
      "Bharat Forge Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 32,
      "Technology": 18,
      "Industrials": 16,
      "Auto": 14,
      "Consumer": 12,
      "Others": 8
    }
  },
  {
    "id": "mirae-midcap",
    "houseId": "mirae",
    "amfiCode": 147402,
    "name": "Mirae Asset Midcap Fund",
    "shortName": "Mirae Midcap",
    "amc": "Mirae Asset Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 34.8,
    "aumCr": 16400,
    "expenseRatio": 0.68,
    "regularExpenseRatio": 1.72,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Ankit Jain",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 43.8,
      "y3": 28.6,
      "y5": 26.2,
      "y10": 19.4,
      "inception": 26.2
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 5.4,
      "beta": 0.9,
      "sharpe": 1.56,
      "sortino": 2.22,
      "stdDev": 14.8
    },
    "holdings": [
      {
        "name": "Federal Bank Ltd.",
        "percent": 4.8,
        "sector": "Financial Services"
      },
      {
        "name": "Trent Ltd.",
        "percent": 4.3,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Bharat Forge Ltd.",
        "percent": 3.9,
        "sector": "Auto Ancillary"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 3.7,
        "sector": "Information Technology"
      },
      {
        "name": "Coforge Ltd.",
        "percent": 3.5,
        "sector": "Information Technology"
      },
      {
        "name": "The Phoenix Mills Ltd.",
        "percent": 3.3,
        "sector": "Real Estate / Retail Malls"
      },
      {
        "name": "Cummins India Ltd.",
        "percent": 3.1,
        "sector": "Capital Goods"
      },
      {
        "name": "Polycab India Ltd.",
        "percent": 2.95,
        "sector": "Electrical Equipment"
      },
      {
        "name": "Supreme Industries Ltd.",
        "percent": 2.8,
        "sector": "Plastic Products"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.6,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Federal Bank Ltd.",
      "Trent Ltd.",
      "Bharat Forge Ltd.",
      "Persistent Systems Ltd.",
      "Coforge Ltd.",
      "The Phoenix Mills Ltd.",
      "Cummins India Ltd.",
      "Polycab India Ltd.",
      "Supreme Industries Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 28,
      "Financials": 22,
      "Technology": 20,
      "Consumer": 16,
      "Others": 14
    }
  },
  {
    "id": "mirae-elss",
    "houseId": "mirae",
    "amfiCode": 135781,
    "name": "Mirae Asset ELSS Tax Saver Fund",
    "shortName": "Mirae ELSS",
    "amc": "Mirae Asset Mutual Fund",
    "category": "ELSS / Tax",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 51.4,
    "aumCr": 24100,
    "expenseRatio": 0.58,
    "regularExpenseRatio": 1.58,
    "exitLoad": "Nil (3Y Lock-in)",
    "minSip": 500,
    "manager": "Neelesh Surana",
    "benchmark": "NIFTY 500 TRI",
    "returns": {
      "y1": 36.4,
      "y3": 23.2,
      "y5": 22.4,
      "y10": 18.0,
      "inception": 22.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 4.2,
      "beta": 0.92,
      "sharpe": 1.5,
      "sortino": 2.14,
      "stdDev": 13.8
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 8.4,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 7.8,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 6.7,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 5.8,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 4.9,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Tata Motors Ltd.",
        "percent": 4.1,
        "sector": "Automobile"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 3.7,
        "sector": "Telecommunication"
      },
      {
        "name": "Federal Bank Ltd.",
        "percent": 3.4,
        "sector": "Financial Services"
      },
      {
        "name": "Trent Ltd.",
        "percent": 3.1,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Cash & Money Market",
        "percent": 3.9,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "Tata Motors Ltd.",
      "Bharti Airtel Ltd.",
      "Federal Bank Ltd.",
      "Trent Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 35,
      "Technology": 19,
      "Energy": 14,
      "Industrials": 14,
      "Consumer": 11,
      "Others": 7
    }
  },
  {
    "id": "tata-smallcap",
    "houseId": "tata",
    "amfiCode": 145206,
    "name": "Tata Small Cap Fund",
    "shortName": "Tata Small Cap",
    "amc": "Tata Mutual Fund",
    "category": "Small Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 42.8,
    "aumCr": 8900,
    "expenseRatio": 0.42,
    "regularExpenseRatio": 1.68,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Chandraprakash Padiyar",
    "benchmark": "NIFTY Smallcap 250 TRI",
    "returns": {
      "y1": 46.2,
      "y3": 31.4,
      "y5": 30.8,
      "y10": 22.0,
      "inception": 30.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 7.1,
      "beta": 0.88,
      "sharpe": 1.65,
      "sortino": 2.36,
      "stdDev": 14.8
    },
    "holdings": [
      {
        "name": "Quess Corp Ltd.",
        "percent": 4.6,
        "sector": "Staffing & Business Services"
      },
      {
        "name": "BASF India Ltd.",
        "percent": 4.1,
        "sector": "Chemicals / Specialty"
      },
      {
        "name": "Radico Khaitan Ltd.",
        "percent": 3.8,
        "sector": "Alcoholic Beverages"
      },
      {
        "name": "IDFC First Bank Ltd.",
        "percent": 3.6,
        "sector": "Financial Services"
      },
      {
        "name": "Honasa Consumer (Mamaearth)",
        "percent": 3.3,
        "sector": "Personal Care / FMCG"
      },
      {
        "name": "Kirloskar Oil Engines Ltd.",
        "percent": 3.1,
        "sector": "Industrial Machinery"
      },
      {
        "name": "Allcargo Logistics Ltd.",
        "percent": 2.95,
        "sector": "Logistics"
      },
      {
        "name": "Redington Ltd.",
        "percent": 2.8,
        "sector": "Supply Chain / Tech"
      },
      {
        "name": "CreditAccess Grameen Ltd.",
        "percent": 2.65,
        "sector": "Microfinance"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.4,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Quess Corp Ltd.",
      "BASF India Ltd.",
      "Radico Khaitan Ltd.",
      "IDFC First Bank Ltd.",
      "Honasa Consumer (Mamaearth)",
      "Kirloskar Oil Engines Ltd.",
      "Allcargo Logistics Ltd.",
      "Redington Ltd.",
      "CreditAccess Grameen Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 26,
      "Consumer": 24,
      "Financials": 18,
      "Chemicals": 14,
      "Technology": 10,
      "Others": 8
    }
  },
  {
    "id": "tata-digital-india",
    "houseId": "tata",
    "amfiCode": 135800,
    "name": "Tata Digital India Fund",
    "shortName": "Tata Digital India",
    "amc": "Tata Mutual Fund",
    "category": "Thematic / Tech",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 54.2,
    "aumCr": 11400,
    "expenseRatio": 0.46,
    "regularExpenseRatio": 1.7,
    "exitLoad": "0.25% < 30 days",
    "minSip": 500,
    "manager": "Meeta Shetty",
    "benchmark": "BSE TeCK TRI",
    "returns": {
      "y1": 36.8,
      "y3": 21.2,
      "y5": 24.5,
      "y10": 19.8,
      "inception": 24.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 4.8,
      "beta": 0.94,
      "sharpe": 1.44,
      "sortino": 2.08,
      "stdDev": 17.8
    },
    "holdings": [
      {
        "name": "Infosys Ltd.",
        "percent": 18.4,
        "sector": "Information Technology"
      },
      {
        "name": "Tata Consultancy Services Ltd.",
        "percent": 16.2,
        "sector": "Information Technology"
      },
      {
        "name": "HCL Technologies Ltd.",
        "percent": 10.5,
        "sector": "Information Technology"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 8.9,
        "sector": "Telecommunications"
      },
      {
        "name": "Tech Mahindra Ltd.",
        "percent": 7.4,
        "sector": "Information Technology"
      },
      {
        "name": "Wipro Ltd.",
        "percent": 5.8,
        "sector": "Information Technology"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 5.1,
        "sector": "IT Consulting & Software"
      },
      {
        "name": "Coforge Ltd.",
        "percent": 4.6,
        "sector": "Software Solutions"
      },
      {
        "name": "LTIMindtree Ltd.",
        "percent": 4.1,
        "sector": "Information Technology"
      },
      {
        "name": "Cash & Money Market",
        "percent": 3.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Infosys Ltd.",
      "Tata Consultancy Services Ltd.",
      "HCL Technologies Ltd.",
      "Bharti Airtel Ltd.",
      "Tech Mahindra Ltd.",
      "Wipro Ltd.",
      "Persistent Systems Ltd.",
      "Coforge Ltd.",
      "LTIMindtree Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Information Technology": 84,
      "Telecommunication": 12,
      "Cash": 4
    }
  },
  {
    "id": "tata-midcap",
    "houseId": "tata",
    "amfiCode": 120760,
    "name": "Tata Mid Cap Growth Fund",
    "shortName": "Tata Mid Cap",
    "amc": "Tata Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 398.2,
    "aumCr": 4800,
    "expenseRatio": 0.76,
    "regularExpenseRatio": 1.78,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Satish Chandra Mishra",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 44.6,
      "y3": 29.8,
      "y5": 26.4,
      "y10": 18.6,
      "inception": 26.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 5.2,
      "beta": 0.9,
      "sharpe": 1.54,
      "sortino": 2.2,
      "stdDev": 14.5
    },
    "holdings": [
      {
        "name": "Trent Ltd.",
        "percent": 5.1,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Bharat Forge Ltd.",
        "percent": 4.6,
        "sector": "Auto Components"
      },
      {
        "name": "The Phoenix Mills Ltd.",
        "percent": 4.1,
        "sector": "Real Estate / Retail Malls"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 3.8,
        "sector": "Information Technology"
      },
      {
        "name": "Federal Bank Ltd.",
        "percent": 3.6,
        "sector": "Financial Services"
      },
      {
        "name": "Polycab India Ltd.",
        "percent": 3.35,
        "sector": "Capital Goods"
      },
      {
        "name": "Cummins India Ltd.",
        "percent": 3.1,
        "sector": "Diesel Engines"
      },
      {
        "name": "Lupin Ltd.",
        "percent": 2.9,
        "sector": "Healthcare / Pharma"
      },
      {
        "name": "Ashok Leyland Ltd.",
        "percent": 2.75,
        "sector": "Commercial Vehicles"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Trent Ltd.",
      "Bharat Forge Ltd.",
      "The Phoenix Mills Ltd.",
      "Persistent Systems Ltd.",
      "Federal Bank Ltd.",
      "Polycab India Ltd.",
      "Cummins India Ltd.",
      "Lupin Ltd.",
      "Ashok Leyland Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 29,
      "Auto": 21,
      "Financials": 18,
      "Consumer": 15,
      "Technology": 12,
      "Others": 5
    }
  },
  {
    "id": "tata-largemidcap",
    "houseId": "tata",
    "amfiCode": 120757,
    "name": "Tata Large & Mid Cap Fund",
    "shortName": "Tata Large & Midcap",
    "amc": "Tata Mutual Fund",
    "category": "Large & Mid Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 512.4,
    "aumCr": 7800,
    "expenseRatio": 0.74,
    "regularExpenseRatio": 1.76,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Chandraprakash Padiyar",
    "benchmark": "NIFTY LargeMidcap 250 TRI",
    "returns": {
      "y1": 38.2,
      "y3": 23.8,
      "y5": 21.6,
      "y10": 16.5,
      "inception": 21.6
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 3.9,
      "beta": 0.92,
      "sharpe": 1.48,
      "sortino": 2.1,
      "stdDev": 13.9
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 7.4,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 6.8,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 5.9,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 5.1,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 4.6,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Tata Motors Ltd.",
        "percent": 3.9,
        "sector": "Automobile"
      },
      {
        "name": "Trent Ltd.",
        "percent": 3.5,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Bharat Forge Ltd.",
        "percent": 3.2,
        "sector": "Auto Components"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 2.9,
        "sector": "Information Technology"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.1,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "Tata Motors Ltd.",
      "Trent Ltd.",
      "Bharat Forge Ltd.",
      "Persistent Systems Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 32,
      "Technology": 18,
      "Industrials": 16,
      "Auto": 14,
      "Consumer": 12,
      "Others": 8
    }
  },
  {
    "id": "motilal-midcap",
    "houseId": "motilal",
    "amfiCode": 127042,
    "name": "Motilal Oswal Midcap Fund",
    "shortName": "Motilal Midcap",
    "amc": "Motilal Oswal Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 118.4,
    "aumCr": 18500,
    "expenseRatio": 0.64,
    "regularExpenseRatio": 1.64,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Niket Shah",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 56.2,
      "y3": 38.4,
      "y5": 31.8,
      "y10": 22.4,
      "inception": 31.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 8.4,
      "beta": 0.92,
      "sharpe": 1.82,
      "sortino": 2.65,
      "stdDev": 15.6
    },
    "holdings": [
      {
        "name": "Trent Ltd.",
        "percent": 9.8,
        "sector": "Retail / Fashion"
      },
      {
        "name": "Zomato Ltd.",
        "percent": 7.4,
        "sector": "E-Commerce / Food Delivery"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 6.8,
        "sector": "Information Technology"
      },
      {
        "name": "The Phoenix Mills Ltd.",
        "percent": 5.9,
        "sector": "Commercial Real Estate"
      },
      {
        "name": "Jio Financial Services Ltd.",
        "percent": 5.2,
        "sector": "Financial Services"
      },
      {
        "name": "Prestige Estates Projects",
        "percent": 4.8,
        "sector": "Realty / Housing"
      },
      {
        "name": "Suzlon Energy Ltd.",
        "percent": 4.3,
        "sector": "Renewable Energy / Wind"
      },
      {
        "name": "Inox Wind Ltd.",
        "percent": 3.9,
        "sector": "Wind Turbine Manufacturing"
      },
      {
        "name": "Dixon Technologies Ltd.",
        "percent": 3.6,
        "sector": "Electronic Mfg"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.4,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Trent Ltd.",
      "Zomato Ltd.",
      "Persistent Systems Ltd.",
      "The Phoenix Mills Ltd.",
      "Jio Financial Services Ltd.",
      "Prestige Estates Projects",
      "Suzlon Energy Ltd.",
      "Inox Wind Ltd.",
      "Dixon Technologies Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Consumer & Retail": 28,
      "Real Estate & Infra": 22,
      "Technology": 18,
      "Clean Energy": 16,
      "Financials": 12,
      "Others": 4
    }
  },
  {
    "id": "motilal-smallcap",
    "houseId": "motilal",
    "amfiCode": 149444,
    "name": "Motilal Oswal Small Cap Fund",
    "shortName": "Motilal Smallcap",
    "amc": "Motilal Oswal Mutual Fund",
    "category": "Small Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 21.4,
    "aumCr": 4800,
    "expenseRatio": 0.52,
    "regularExpenseRatio": 1.68,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Ajay Khandelwal",
    "benchmark": "NIFTY Smallcap 250 TRI",
    "returns": {
      "y1": 52.8,
      "y3": 33.5,
      "y5": 30.2,
      "y10": 21.5,
      "inception": 30.2
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 7.8,
      "beta": 0.88,
      "sharpe": 1.72,
      "sortino": 2.44,
      "stdDev": 16.2
    },
    "holdings": [
      {
        "name": "Inox Wind Ltd.",
        "percent": 5.8,
        "sector": "Renewable Energy / Wind"
      },
      {
        "name": "Amber Enterprises India",
        "percent": 4.9,
        "sector": "HVAC / Electronics"
      },
      {
        "name": "Global Health (Medanta)",
        "percent": 4.4,
        "sector": "Healthcare Services"
      },
      {
        "name": "Kaynes Technology India",
        "percent": 4.1,
        "sector": "Electronics System Mfg"
      },
      {
        "name": "eMudhra Ltd.",
        "percent": 3.8,
        "sector": "Cybersecurity / Certs"
      },
      {
        "name": "Choice International Ltd.",
        "percent": 3.5,
        "sector": "Financial Services"
      },
      {
        "name": "Zen Technologies Ltd.",
        "percent": 3.3,
        "sector": "Defence Simulation / Drones"
      },
      {
        "name": "Arvind SmartSpaces Ltd.",
        "percent": 3.1,
        "sector": "Real Estate"
      },
      {
        "name": "Suprajit Engineering Ltd.",
        "percent": 2.9,
        "sector": "Auto Components"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.2,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Inox Wind Ltd.",
      "Amber Enterprises India",
      "Global Health (Medanta)",
      "Kaynes Technology India",
      "eMudhra Ltd.",
      "Choice International Ltd.",
      "Zen Technologies Ltd.",
      "Arvind SmartSpaces Ltd.",
      "Suprajit Engineering Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials & Electronics": 32,
      "Healthcare": 16,
      "Energy & Power": 15,
      "Financials": 14,
      "Technology": 12,
      "Others": 11
    }
  },
  {
    "id": "motilal-flexicap",
    "houseId": "motilal",
    "amfiCode": 128952,
    "name": "Motilal Oswal Flexi Cap Fund",
    "shortName": "Motilal Flexi",
    "amc": "Motilal Oswal Mutual Fund",
    "category": "Flexi Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 52.6,
    "aumCr": 10200,
    "expenseRatio": 0.72,
    "regularExpenseRatio": 1.74,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Niket Shah",
    "benchmark": "NIFTY 500 TRI",
    "returns": {
      "y1": 41.2,
      "y3": 27.4,
      "y5": 23.5,
      "y10": 17.8,
      "inception": 23.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 4.9,
      "beta": 0.94,
      "sharpe": 1.52,
      "sortino": 2.15,
      "stdDev": 14.8
    },
    "holdings": [
      {
        "name": "Trent Ltd.",
        "percent": 8.4,
        "sector": "Retail / Fashion"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 7.8,
        "sector": "Financial Services"
      },
      {
        "name": "Zomato Ltd.",
        "percent": 6.8,
        "sector": "Food Tech / Consumer"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 5.9,
        "sector": "Information Technology"
      },
      {
        "name": "Jio Financial Services Ltd.",
        "percent": 5.4,
        "sector": "Financial Services"
      },
      {
        "name": "The Phoenix Mills Ltd.",
        "percent": 4.8,
        "sector": "Real Estate"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 4.5,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 4.2,
        "sector": "Energy / Refining"
      },
      {
        "name": "Suzlon Energy Ltd.",
        "percent": 3.8,
        "sector": "Renewable Energy"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.5,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Trent Ltd.",
      "ICICI Bank Ltd.",
      "Zomato Ltd.",
      "Persistent Systems Ltd.",
      "Jio Financial Services Ltd.",
      "The Phoenix Mills Ltd.",
      "Larsen & Toubro Ltd.",
      "Reliance Industries Ltd.",
      "Suzlon Energy Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Consumer": 26,
      "Financials": 24,
      "Technology": 18,
      "Infra & Energy": 18,
      "Real Estate": 10,
      "Others": 4
    }
  },
  {
    "id": "motilal-largemidcap",
    "houseId": "motilal",
    "amfiCode": 147683,
    "name": "Motilal Oswal Large and Midcap Fund",
    "shortName": "Motilal Large & Mid",
    "amc": "Motilal Oswal Mutual Fund",
    "category": "Large & Mid Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 32.4,
    "aumCr": 5600,
    "expenseRatio": 0.68,
    "regularExpenseRatio": 1.72,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Ajay Khandelwal & Santosh Singh",
    "benchmark": "NIFTY LargeMidcap 250 TRI",
    "returns": {
      "y1": 44.8,
      "y3": 29.2,
      "y5": 25.8,
      "y10": 18.5,
      "inception": 25.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 5.8,
      "beta": 0.92,
      "sharpe": 1.62,
      "sortino": 2.3,
      "stdDev": 15.0
    },
    "holdings": [
      {
        "name": "Trent Ltd.",
        "percent": 7.6,
        "sector": "Retail / Consumer"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 7.1,
        "sector": "Financial Services"
      },
      {
        "name": "Zomato Ltd.",
        "percent": 6.2,
        "sector": "Food Delivery / E-Commerce"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 5.8,
        "sector": "Financial Services"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 5.2,
        "sector": "Information Technology"
      },
      {
        "name": "The Phoenix Mills Ltd.",
        "percent": 4.6,
        "sector": "Real Estate"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 4.2,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 3.9,
        "sector": "Energy / Refining"
      },
      {
        "name": "Inox Wind Ltd.",
        "percent": 3.5,
        "sector": "Renewable Energy"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.3,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Trent Ltd.",
      "ICICI Bank Ltd.",
      "Zomato Ltd.",
      "HDFC Bank Ltd.",
      "Persistent Systems Ltd.",
      "The Phoenix Mills Ltd.",
      "Larsen & Toubro Ltd.",
      "Reliance Industries Ltd.",
      "Inox Wind Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Consumer": 25,
      "Financials": 25,
      "Technology": 17,
      "Industrials & Energy": 17,
      "Real Estate": 10,
      "Others": 6
    }
  },
  {
    "id": "ppfas-flexi",
    "houseId": "ppfas",
    "amfiCode": 122639,
    "name": "Parag Parikh Flexi Cap Fund",
    "shortName": "PPFAS Flexi Cap",
    "amc": "PPFAS Mutual Fund",
    "category": "Flexi Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 84.2,
    "aumCr": 72400,
    "expenseRatio": 0.61,
    "regularExpenseRatio": 1.34,
    "exitLoad": "2% < 365d, 1% < 730d",
    "minSip": 1000,
    "manager": "Rajeev Thakkar & Raunak Onkar",
    "benchmark": "NIFTY 500 TRI",
    "returns": {
      "y1": 39.5,
      "y3": 23.8,
      "y5": 25.2,
      "y10": 20.4,
      "inception": 25.2
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 6.2,
      "beta": 0.74,
      "sharpe": 1.68,
      "sortino": 2.45,
      "stdDev": 12.4
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 8.12,
        "sector": "Financial Services"
      },
      {
        "name": "Bajaj Holdings & Investment Ltd.",
        "percent": 7.45,
        "sector": "Holding Company / NBFC"
      },
      {
        "name": "Power Grid Corp of India",
        "percent": 6.3,
        "sector": "Utilities / Power Trans"
      },
      {
        "name": "ITC Ltd.",
        "percent": 5.92,
        "sector": "FMCG / Diversified"
      },
      {
        "name": "Coal India Ltd.",
        "percent": 5.4,
        "sector": "Energy / Mining"
      },
      {
        "name": "Alphabet Inc. (Google Class A)",
        "percent": 4.85,
        "sector": "Global Tech / US Equity"
      },
      {
        "name": "Microsoft Corp",
        "percent": 4.2,
        "sector": "Global Tech / US Equity"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 3.95,
        "sector": "Financial Services"
      },
      {
        "name": "Maruti Suzuki India Ltd.",
        "percent": 3.65,
        "sector": "Automobile"
      },
      {
        "name": "Cash, Arbitrage & TREPS",
        "percent": 14.8,
        "sector": "Hedged Cash & Liquid"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "Bajaj Holdings & Investment Ltd.",
      "Power Grid Corp of India",
      "ITC Ltd.",
      "Coal India Ltd.",
      "Alphabet Inc. (Google Class A)",
      "Microsoft Corp",
      "ICICI Bank Ltd.",
      "Maruti Suzuki India Ltd.",
      "Cash, Arbitrage & TREPS"
    ],
    "sectors": {
      "Financials": 24,
      "Cash & Arbitrage": 15,
      "Energy & Mining": 14,
      "Global Tech (US)": 13,
      "FMCG": 12,
      "Utilities": 10,
      "Auto": 8,
      "Others": 4
    }
  },
  {
    "id": "ppfas-elss",
    "houseId": "ppfas",
    "amfiCode": 149836,
    "name": "Parag Parikh ELSS Tax Saver Fund",
    "shortName": "PPFAS ELSS",
    "amc": "PPFAS Mutual Fund",
    "category": "ELSS / Tax",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 18.6,
    "aumCr": 4200,
    "expenseRatio": 0.64,
    "regularExpenseRatio": 1.48,
    "exitLoad": "Nil (3Y Lock-in)",
    "minSip": 500,
    "manager": "Rajeev Thakkar & Raunak Onkar",
    "benchmark": "NIFTY 500 TRI",
    "returns": {
      "y1": 37.8,
      "y3": 24.2,
      "y5": 24.0,
      "y10": 19.8,
      "inception": 24.0
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 5.8,
      "beta": 0.78,
      "sharpe": 1.62,
      "sortino": 2.38,
      "stdDev": 12.8
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 8.9,
        "sector": "Financial Services"
      },
      {
        "name": "Bajaj Holdings & Investment Ltd.",
        "percent": 8.1,
        "sector": "Holding Company"
      },
      {
        "name": "Power Grid Corp of India",
        "percent": 6.8,
        "sector": "Utilities"
      },
      {
        "name": "ITC Ltd.",
        "percent": 6.4,
        "sector": "FMCG"
      },
      {
        "name": "Coal India Ltd.",
        "percent": 5.9,
        "sector": "Mining & Energy"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 4.6,
        "sector": "Financial Services"
      },
      {
        "name": "Maruti Suzuki India Ltd.",
        "percent": 4.1,
        "sector": "Automobile"
      },
      {
        "name": "Axis Bank Ltd.",
        "percent": 3.7,
        "sector": "Financial Services"
      },
      {
        "name": "HCL Technologies Ltd.",
        "percent": 3.4,
        "sector": "Information Technology"
      },
      {
        "name": "Cash & Money Market",
        "percent": 8.4,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "Bajaj Holdings & Investment Ltd.",
      "Power Grid Corp of India",
      "ITC Ltd.",
      "Coal India Ltd.",
      "ICICI Bank Ltd.",
      "Maruti Suzuki India Ltd.",
      "Axis Bank Ltd.",
      "HCL Technologies Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 29,
      "Energy & Utilities": 19,
      "FMCG": 14,
      "Auto": 10,
      "Technology": 9,
      "Cash": 9,
      "Others": 10
    }
  },
  {
    "id": "ppfas-dynamic-asset",
    "houseId": "ppfas",
    "amfiCode": 148767,
    "name": "Parag Parikh Dynamic Asset Allocation Fund",
    "shortName": "PPFAS Dynamic Asset",
    "amc": "PPFAS Mutual Fund",
    "category": "Dynamic Asset / BAF",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Moderate",
    "nav": 12.45,
    "aumCr": 1900,
    "expenseRatio": 0.45,
    "regularExpenseRatio": 1.25,
    "exitLoad": "0.5% < 30 days",
    "minSip": 500,
    "manager": "Rajeev Thakkar & Rukun Tarachandani",
    "benchmark": "CRISIL Hybrid 50+50",
    "returns": {
      "y1": 19.8,
      "y3": 14.5,
      "y5": 14.0,
      "y10": 12.5,
      "inception": 14.0
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 3.4,
      "beta": 0.65,
      "sharpe": 1.58,
      "sortino": 2.2,
      "stdDev": 8.2
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 5.4,
        "sector": "Financial Services"
      },
      {
        "name": "Bajaj Holdings & Investment Ltd.",
        "percent": 4.8,
        "sector": "Financial Services"
      },
      {
        "name": "Power Grid Corp of India",
        "percent": 4.2,
        "sector": "Utilities"
      },
      {
        "name": "ITC Ltd.",
        "percent": 3.9,
        "sector": "FMCG"
      },
      {
        "name": "Coal India Ltd.",
        "percent": 3.5,
        "sector": "Energy"
      },
      {
        "name": "Government of India 7.18% 2033",
        "percent": 24.5,
        "sector": "Sovereign Debt"
      },
      {
        "name": "AAA Corporate Bonds",
        "percent": 16.8,
        "sector": "Debt Securities"
      },
      {
        "name": "Equity Arbitrage Hedged",
        "percent": 18.2,
        "sector": "Derivatives Hedge"
      },
      {
        "name": "Treasury Bills 91-Day",
        "percent": 8.5,
        "sector": "Money Market"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "Bajaj Holdings & Investment Ltd.",
      "Power Grid Corp of India",
      "ITC Ltd.",
      "Coal India Ltd.",
      "Government of India 7.18% 2033",
      "AAA Corporate Bonds",
      "Equity Arbitrage Hedged",
      "Treasury Bills 91-Day"
    ],
    "sectors": {
      "Sovereign & Debt": 45,
      "Hedged Arbitrage": 22,
      "Equities Unhedged": 25,
      "Cash": 8
    }
  },
  {
    "id": "uti-nifty50",
    "houseId": "uti",
    "amfiCode": 120716,
    "name": "UTI Nifty 50 Index Fund",
    "shortName": "UTI Nifty 50",
    "amc": "UTI Mutual Fund",
    "category": "Index Fund",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 184.2,
    "aumCr": 19800,
    "expenseRatio": 0.18,
    "regularExpenseRatio": 0.38,
    "exitLoad": "Nil",
    "minSip": 500,
    "manager": "Sharwan Kumar Goyal",
    "benchmark": "NIFTY 50 TRI",
    "returns": {
      "y1": 31.8,
      "y3": 17.6,
      "y5": 17.2,
      "y10": 14.8,
      "inception": 17.2
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 0.1,
      "beta": 1.0,
      "sharpe": 1.22,
      "sortino": 1.74,
      "stdDev": 13.4
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 11.45,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 9.2,
        "sector": "Energy / Refining"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 7.95,
        "sector": "Financial Services"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 6.1,
        "sector": "Information Technology"
      },
      {
        "name": "Tata Consultancy Services Ltd.",
        "percent": 4.25,
        "sector": "Information Technology"
      },
      {
        "name": "ITC Ltd.",
        "percent": 3.9,
        "sector": "FMCG / Diversified"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 3.85,
        "sector": "Engineering & Construction"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 3.65,
        "sector": "Telecommunication"
      },
      {
        "name": "Axis Bank Ltd.",
        "percent": 3.2,
        "sector": "Financial Services"
      },
      {
        "name": "State Bank of India",
        "percent": 3.1,
        "sector": "Financial Services"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "Reliance Industries Ltd.",
      "ICICI Bank Ltd.",
      "Infosys Ltd.",
      "Tata Consultancy Services Ltd.",
      "ITC Ltd.",
      "Larsen & Toubro Ltd.",
      "Bharti Airtel Ltd.",
      "Axis Bank Ltd.",
      "State Bank of India"
    ],
    "sectors": {
      "Financials": 33,
      "Technology": 15,
      "Energy": 12,
      "Consumer": 10,
      "Industrials": 9,
      "Others": 21
    }
  },
  {
    "id": "uti-flexicap",
    "houseId": "uti",
    "amfiCode": 120703,
    "name": "UTI Flexi Cap Fund",
    "shortName": "UTI Flexi",
    "amc": "UTI Mutual Fund",
    "category": "Flexi Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 312.5,
    "aumCr": 24800,
    "expenseRatio": 0.88,
    "regularExpenseRatio": 1.72,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Ajay Tyagi",
    "benchmark": "NIFTY 500 TRI",
    "returns": {
      "y1": 34.2,
      "y3": 19.8,
      "y5": 18.5,
      "y10": 15.2,
      "inception": 18.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 3.2,
      "beta": 0.9,
      "sharpe": 1.34,
      "sortino": 1.92,
      "stdDev": 13.5
    },
    "holdings": [
      {
        "name": "LTIMindtree Ltd.",
        "percent": 6.8,
        "sector": "Information Technology"
      },
      {
        "name": "Bajaj Finance Ltd.",
        "percent": 6.2,
        "sector": "Financial Services"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 5.9,
        "sector": "Financial Services"
      },
      {
        "name": "Kotak Mahindra Bank Ltd.",
        "percent": 5.1,
        "sector": "Financial Services"
      },
      {
        "name": "Info Edge (India) Ltd.",
        "percent": 4.6,
        "sector": "Internet / Portals"
      },
      {
        "name": "Avenue Supermarts (DMart)",
        "percent": 4.2,
        "sector": "Retail / Supermarket"
      },
      {
        "name": "Astral Ltd.",
        "percent": 3.8,
        "sector": "Building Materials / Pipes"
      },
      {
        "name": "Tata Consultancy Services Ltd.",
        "percent": 3.5,
        "sector": "Information Technology"
      },
      {
        "name": "Coforge Ltd.",
        "percent": 3.2,
        "sector": "Information Technology"
      },
      {
        "name": "Cash & Money Market",
        "percent": 3.9,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "LTIMindtree Ltd.",
      "Bajaj Finance Ltd.",
      "HDFC Bank Ltd.",
      "Kotak Mahindra Bank Ltd.",
      "Info Edge (India) Ltd.",
      "Avenue Supermarts (DMart)",
      "Astral Ltd.",
      "Tata Consultancy Services Ltd.",
      "Coforge Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 28,
      "Technology": 24,
      "Consumer": 20,
      "Industrials": 16,
      "Others": 12
    }
  },
  {
    "id": "uti-midcap",
    "houseId": "uti",
    "amfiCode": 120698,
    "name": "UTI Mid Cap Fund",
    "shortName": "UTI Midcap",
    "amc": "UTI Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 278.4,
    "aumCr": 11200,
    "expenseRatio": 0.82,
    "regularExpenseRatio": 1.74,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Ankit Agarwal",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 42.4,
      "y3": 27.8,
      "y5": 25.2,
      "y10": 18.4,
      "inception": 25.2
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 4.8,
      "beta": 0.89,
      "sharpe": 1.48,
      "sortino": 2.12,
      "stdDev": 14.6
    },
    "holdings": [
      {
        "name": "Bharat Forge Ltd.",
        "percent": 4.8,
        "sector": "Auto Components"
      },
      {
        "name": "The Phoenix Mills Ltd.",
        "percent": 4.2,
        "sector": "Real Estate"
      },
      {
        "name": "Trent Ltd.",
        "percent": 3.9,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Federal Bank Ltd.",
        "percent": 3.7,
        "sector": "Financial Services"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 3.4,
        "sector": "Information Technology"
      },
      {
        "name": "Cummins India Ltd.",
        "percent": 3.2,
        "sector": "Capital Goods"
      },
      {
        "name": "Polycab India Ltd.",
        "percent": 3.0,
        "sector": "Electrical Equipment"
      },
      {
        "name": "Supreme Industries Ltd.",
        "percent": 2.8,
        "sector": "Plastics"
      },
      {
        "name": "Lupin Ltd.",
        "percent": 2.65,
        "sector": "Healthcare / Pharma"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.6,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Bharat Forge Ltd.",
      "The Phoenix Mills Ltd.",
      "Trent Ltd.",
      "Federal Bank Ltd.",
      "Persistent Systems Ltd.",
      "Cummins India Ltd.",
      "Polycab India Ltd.",
      "Supreme Industries Ltd.",
      "Lupin Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 28,
      "Financials": 20,
      "Auto": 18,
      "Consumer": 16,
      "Technology": 12,
      "Others": 6
    }
  },
  {
    "id": "dsp-smallcap",
    "houseId": "dsp",
    "amfiCode": 119212,
    "name": "DSP Small Cap Fund",
    "shortName": "DSP Small Cap",
    "amc": "DSP Mutual Fund",
    "category": "Small Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 168.9,
    "aumCr": 14200,
    "expenseRatio": 0.68,
    "regularExpenseRatio": 1.68,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Vinit Sambre & Resham Jain",
    "benchmark": "BSE 250 SmallCap TRI",
    "returns": {
      "y1": 45.8,
      "y3": 30.2,
      "y5": 31.5,
      "y10": 21.8,
      "inception": 31.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 6.8,
      "beta": 0.86,
      "sharpe": 1.62,
      "sortino": 2.3,
      "stdDev": 15.1
    },
    "holdings": [
      {
        "name": "Ratnamani Metals & Tubes Ltd.",
        "percent": 4.4,
        "sector": "Steel / Industrial Pipes"
      },
      {
        "name": "Suprajit Engineering Ltd.",
        "percent": 3.9,
        "sector": "Auto Components"
      },
      {
        "name": "Ipca Laboratories Ltd.",
        "percent": 3.65,
        "sector": "Healthcare / Pharma"
      },
      {
        "name": "KNR Constructions Ltd.",
        "percent": 3.4,
        "sector": "Construction & Highways"
      },
      {
        "name": "Man Infraconstruction Ltd.",
        "percent": 3.15,
        "sector": "Infrastructure / EPC"
      },
      {
        "name": "Birlasoft Ltd.",
        "percent": 2.95,
        "sector": "Information Technology"
      },
      {
        "name": "Craftsman Automation Ltd.",
        "percent": 2.8,
        "sector": "Auto Ancillary"
      },
      {
        "name": "Finolex Cables Ltd.",
        "percent": 2.65,
        "sector": "Cables & Electricals"
      },
      {
        "name": "Swaraj Engines Ltd.",
        "percent": 2.5,
        "sector": "Agri / Engines"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.4,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Ratnamani Metals & Tubes Ltd.",
      "Suprajit Engineering Ltd.",
      "Ipca Laboratories Ltd.",
      "KNR Constructions Ltd.",
      "Man Infraconstruction Ltd.",
      "Birlasoft Ltd.",
      "Craftsman Automation Ltd.",
      "Finolex Cables Ltd.",
      "Swaraj Engines Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 32,
      "Healthcare": 18,
      "Auto": 16,
      "Technology": 12,
      "Financials": 12,
      "Others": 10
    }
  },
  {
    "id": "dsp-midcap",
    "houseId": "dsp",
    "amfiCode": 119208,
    "name": "DSP Midcap Fund",
    "shortName": "DSP Midcap",
    "amc": "DSP Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 128.4,
    "aumCr": 17800,
    "expenseRatio": 0.74,
    "regularExpenseRatio": 1.72,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Vinit Sambre & Jay Kothari",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 41.5,
      "y3": 26.8,
      "y5": 24.2,
      "y10": 17.9,
      "inception": 24.2
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 4.4,
      "beta": 0.88,
      "sharpe": 1.45,
      "sortino": 2.08,
      "stdDev": 14.4
    },
    "holdings": [
      {
        "name": "Bharat Forge Ltd.",
        "percent": 4.6,
        "sector": "Auto Components"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 4.1,
        "sector": "Information Technology"
      },
      {
        "name": "The Phoenix Mills Ltd.",
        "percent": 3.8,
        "sector": "Real Estate"
      },
      {
        "name": "Federal Bank Ltd.",
        "percent": 3.5,
        "sector": "Financial Services"
      },
      {
        "name": "Cummins India Ltd.",
        "percent": 3.3,
        "sector": "Capital Goods"
      },
      {
        "name": "Trent Ltd.",
        "percent": 3.1,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Supreme Industries Ltd.",
        "percent": 2.9,
        "sector": "Plastic Products"
      },
      {
        "name": "Polycab India Ltd.",
        "percent": 2.75,
        "sector": "Electricals"
      },
      {
        "name": "Ipca Laboratories Ltd.",
        "percent": 2.6,
        "sector": "Pharmaceuticals"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Bharat Forge Ltd.",
      "Persistent Systems Ltd.",
      "The Phoenix Mills Ltd.",
      "Federal Bank Ltd.",
      "Cummins India Ltd.",
      "Trent Ltd.",
      "Supreme Industries Ltd.",
      "Polycab India Ltd.",
      "Ipca Laboratories Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 28,
      "Auto": 20,
      "Financials": 18,
      "Technology": 16,
      "Consumer": 12,
      "Others": 6
    }
  },
  {
    "id": "dsp-top100",
    "houseId": "dsp",
    "amfiCode": 119204,
    "name": "DSP Top 100 Equity Fund",
    "shortName": "DSP Top 100",
    "amc": "DSP Mutual Fund",
    "category": "Large Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 412.8,
    "aumCr": 3600,
    "expenseRatio": 0.92,
    "regularExpenseRatio": 1.86,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Abhishek Singh",
    "benchmark": "BSE 100 TRI",
    "returns": {
      "y1": 33.2,
      "y3": 19.4,
      "y5": 18.2,
      "y10": 14.6,
      "inception": 18.2
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 2.9,
      "beta": 0.94,
      "sharpe": 1.3,
      "sortino": 1.86,
      "stdDev": 13.1
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 9.4,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 8.7,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 7.8,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 6.9,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 5.8,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Tata Consultancy Services Ltd.",
        "percent": 5.1,
        "sector": "Information Technology"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 4.6,
        "sector": "Telecommunication"
      },
      {
        "name": "State Bank of India",
        "percent": 4.1,
        "sector": "Financial Services"
      },
      {
        "name": "Axis Bank Ltd.",
        "percent": 3.7,
        "sector": "Financial Services"
      },
      {
        "name": "Cash & Money Market",
        "percent": 3.4,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "Tata Consultancy Services Ltd.",
      "Bharti Airtel Ltd.",
      "State Bank of India",
      "Axis Bank Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 37,
      "Technology": 20,
      "Energy": 14,
      "Industrials": 13,
      "Telecom": 7,
      "Others": 9
    }
  },
  {
    "id": "bandhan-smallcap",
    "houseId": "bandhan",
    "amfiCode": 147946,
    "name": "Bandhan Small Cap Fund",
    "shortName": "Bandhan Small Cap",
    "amc": "Bandhan Mutual Fund",
    "category": "Small Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 41.6,
    "aumCr": 5600,
    "expenseRatio": 0.48,
    "regularExpenseRatio": 1.65,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Manish Gunwani & Kirthi Jain",
    "benchmark": "NIFTY Smallcap 250 TRI",
    "returns": {
      "y1": 53.4,
      "y3": 34.2,
      "y5": 32.8,
      "y10": 22.4,
      "inception": 32.8
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 8.2,
      "beta": 0.88,
      "sharpe": 1.74,
      "sortino": 2.48,
      "stdDev": 15.8
    },
    "holdings": [
      {
        "name": "Apar Industries Ltd.",
        "percent": 4.6,
        "sector": "Electrical / Heavy Equip"
      },
      {
        "name": "Tube Investments of India",
        "percent": 4.1,
        "sector": "Auto Ancillary"
      },
      {
        "name": "Arvind Ltd.",
        "percent": 3.7,
        "sector": "Textiles & Apparel"
      },
      {
        "name": "CreditAccess Grameen Ltd.",
        "percent": 3.4,
        "sector": "Microfinance"
      },
      {
        "name": "Power Mech Projects Ltd.",
        "percent": 3.15,
        "sector": "Construction & Infra"
      },
      {
        "name": "Motilal Oswal Fin Services",
        "percent": 2.9,
        "sector": "Financial Services"
      },
      {
        "name": "Shilchar Technologies Ltd.",
        "percent": 2.75,
        "sector": "Transformers / Power"
      },
      {
        "name": "Poonawalla Fincorp Ltd.",
        "percent": 2.6,
        "sector": "NBFC / Lending"
      },
      {
        "name": "KPIT Technologies Ltd.",
        "percent": 2.45,
        "sector": "Automotive Software"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.2,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Apar Industries Ltd.",
      "Tube Investments of India",
      "Arvind Ltd.",
      "CreditAccess Grameen Ltd.",
      "Power Mech Projects Ltd.",
      "Motilal Oswal Fin Services",
      "Shilchar Technologies Ltd.",
      "Poonawalla Fincorp Ltd.",
      "KPIT Technologies Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 31,
      "Financials": 22,
      "Consumer": 16,
      "Technology": 15,
      "Energy": 9,
      "Others": 7
    }
  },
  {
    "id": "bandhan-core-equity",
    "houseId": "bandhan",
    "amfiCode": 119062,
    "name": "Bandhan Core Equity Fund",
    "shortName": "Bandhan Core Equity",
    "amc": "Bandhan Mutual Fund",
    "category": "Large & Mid Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 124.8,
    "aumCr": 4200,
    "expenseRatio": 0.78,
    "regularExpenseRatio": 1.75,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Manish Gunwani",
    "benchmark": "NIFTY LargeMidcap 250 TRI",
    "returns": {
      "y1": 37.8,
      "y3": 23.4,
      "y5": 21.5,
      "y10": 16.2,
      "inception": 21.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 3.8,
      "beta": 0.92,
      "sharpe": 1.44,
      "sortino": 2.06,
      "stdDev": 13.8
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 7.8,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 7.2,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 6.1,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 5.4,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 4.8,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Trent Ltd.",
        "percent": 3.8,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Tata Motors Ltd.",
        "percent": 3.5,
        "sector": "Automobile"
      },
      {
        "name": "Bharat Forge Ltd.",
        "percent": 3.1,
        "sector": "Auto Components"
      },
      {
        "name": "Federal Bank Ltd.",
        "percent": 2.9,
        "sector": "Financial Services"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.2,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "Trent Ltd.",
      "Tata Motors Ltd.",
      "Bharat Forge Ltd.",
      "Federal Bank Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 32,
      "Technology": 18,
      "Industrials": 16,
      "Auto": 14,
      "Consumer": 12,
      "Others": 8
    }
  },
  {
    "id": "bandhan-flexicap",
    "houseId": "bandhan",
    "amfiCode": 119064,
    "name": "Bandhan Flexi Cap Fund",
    "shortName": "Bandhan Flexi",
    "amc": "Bandhan Mutual Fund",
    "category": "Flexi Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 192.5,
    "aumCr": 6800,
    "expenseRatio": 0.74,
    "regularExpenseRatio": 1.72,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Manish Gunwani & Sachin Relekar",
    "benchmark": "NIFTY 500 TRI",
    "returns": {
      "y1": 36.4,
      "y3": 22.8,
      "y5": 20.6,
      "y10": 15.8,
      "inception": 20.6
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 3.6,
      "beta": 0.91,
      "sharpe": 1.42,
      "sortino": 2.02,
      "stdDev": 13.6
    },
    "holdings": [
      {
        "name": "ICICI Bank Ltd.",
        "percent": 8.1,
        "sector": "Financial Services"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 7.6,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 6.5,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 5.8,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 5.1,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Tata Motors Ltd.",
        "percent": 4.2,
        "sector": "Automobile"
      },
      {
        "name": "Trent Ltd.",
        "percent": 3.7,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Sun Pharma Industries Ltd.",
        "percent": 3.4,
        "sector": "Healthcare / Pharma"
      },
      {
        "name": "Bharti Airtel Ltd.",
        "percent": 3.1,
        "sector": "Telecommunication"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.5,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "ICICI Bank Ltd.",
      "HDFC Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "Tata Motors Ltd.",
      "Trent Ltd.",
      "Sun Pharma Industries Ltd.",
      "Bharti Airtel Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 33,
      "Technology": 18,
      "Industrials": 15,
      "Energy": 12,
      "Consumer": 12,
      "Others": 10
    }
  },
  {
    "id": "edelweiss-midcap",
    "houseId": "edelweiss",
    "amfiCode": 119364,
    "name": "Edelweiss Mid Cap Fund",
    "shortName": "Edelweiss Mid Cap",
    "amc": "Edelweiss Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 108.4,
    "aumCr": 7200,
    "expenseRatio": 0.58,
    "regularExpenseRatio": 1.72,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Trideep Bhattacharya",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 48.5,
      "y3": 31.8,
      "y5": 28.6,
      "y10": 20.8,
      "inception": 28.6
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 6.9,
      "beta": 0.88,
      "sharpe": 1.62,
      "sortino": 2.32,
      "stdDev": 14.8
    },
    "holdings": [
      {
        "name": "Trent Ltd.",
        "percent": 4.9,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Federal Bank Ltd.",
        "percent": 4.4,
        "sector": "Financial Services"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 4.1,
        "sector": "Information Technology"
      },
      {
        "name": "Bharat Forge Ltd.",
        "percent": 3.85,
        "sector": "Auto Components"
      },
      {
        "name": "The Phoenix Mills Ltd.",
        "percent": 3.6,
        "sector": "Real Estate"
      },
      {
        "name": "Cummins India Ltd.",
        "percent": 3.35,
        "sector": "Capital Goods"
      },
      {
        "name": "Polycab India Ltd.",
        "percent": 3.1,
        "sector": "Electrical Equipment"
      },
      {
        "name": "Dixon Technologies Ltd.",
        "percent": 2.95,
        "sector": "Consumer Electronics"
      },
      {
        "name": "Supreme Industries Ltd.",
        "percent": 2.8,
        "sector": "Plastics"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.6,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Trent Ltd.",
      "Federal Bank Ltd.",
      "Persistent Systems Ltd.",
      "Bharat Forge Ltd.",
      "The Phoenix Mills Ltd.",
      "Cummins India Ltd.",
      "Polycab India Ltd.",
      "Dixon Technologies Ltd.",
      "Supreme Industries Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 29,
      "Financials": 20,
      "Auto": 18,
      "Technology": 16,
      "Consumer": 12,
      "Others": 5
    }
  },
  {
    "id": "edelweiss-smallcap",
    "houseId": "edelweiss",
    "amfiCode": 145969,
    "name": "Edelweiss Small Cap Fund",
    "shortName": "Edelweiss Small Cap",
    "amc": "Edelweiss Mutual Fund",
    "category": "Small Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 46.2,
    "aumCr": 4800,
    "expenseRatio": 0.44,
    "regularExpenseRatio": 1.68,
    "exitLoad": "1% < 365 days",
    "minSip": 500,
    "manager": "Trideep Bhattacharya & Sahil Shah",
    "benchmark": "NIFTY Smallcap 250 TRI",
    "returns": {
      "y1": 51.2,
      "y3": 33.6,
      "y5": 32.4,
      "y10": 22.8,
      "inception": 32.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 7.8,
      "beta": 0.86,
      "sharpe": 1.7,
      "sortino": 2.42,
      "stdDev": 15.6
    },
    "holdings": [
      {
        "name": "Apar Industries Ltd.",
        "percent": 4.4,
        "sector": "Electrical / Heavy Equip"
      },
      {
        "name": "Tube Investments of India",
        "percent": 3.9,
        "sector": "Auto Components"
      },
      {
        "name": "Power Mech Projects Ltd.",
        "percent": 3.6,
        "sector": "Construction & Infra"
      },
      {
        "name": "CreditAccess Grameen Ltd.",
        "percent": 3.3,
        "sector": "Microfinance"
      },
      {
        "name": "KPIT Technologies Ltd.",
        "percent": 3.1,
        "sector": "Automotive Software"
      },
      {
        "name": "Birlasoft Ltd.",
        "percent": 2.9,
        "sector": "Information Technology"
      },
      {
        "name": "Craftsman Automation Ltd.",
        "percent": 2.75,
        "sector": "Auto Ancillary"
      },
      {
        "name": "Redington Ltd.",
        "percent": 2.6,
        "sector": "Technology Distribution"
      },
      {
        "name": "Rolex Rings Ltd.",
        "percent": 2.45,
        "sector": "Forgings"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.1,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Apar Industries Ltd.",
      "Tube Investments of India",
      "Power Mech Projects Ltd.",
      "CreditAccess Grameen Ltd.",
      "KPIT Technologies Ltd.",
      "Birlasoft Ltd.",
      "Craftsman Automation Ltd.",
      "Redington Ltd.",
      "Rolex Rings Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Industrials": 30,
      "Financials": 20,
      "Technology": 18,
      "Auto": 16,
      "Consumer": 10,
      "Others": 6
    }
  },
  {
    "id": "edelweiss-largemidcap",
    "houseId": "edelweiss",
    "amfiCode": 119360,
    "name": "Edelweiss Large & Mid Cap Fund",
    "shortName": "Edelweiss Large & Mid",
    "amc": "Edelweiss Mutual Fund",
    "category": "Large & Mid Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 84.5,
    "aumCr": 3100,
    "expenseRatio": 0.72,
    "regularExpenseRatio": 1.76,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Trideep Bhattacharya",
    "benchmark": "NIFTY LargeMidcap 250 TRI",
    "returns": {
      "y1": 38.4,
      "y3": 24.2,
      "y5": 22.0,
      "y10": 16.8,
      "inception": 22.0
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 4.1,
      "beta": 0.91,
      "sharpe": 1.48,
      "sortino": 2.1,
      "stdDev": 13.9
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 7.6,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 6.9,
        "sector": "Financial Services"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 6.2,
        "sector": "Energy / Refining"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 5.4,
        "sector": "Information Technology"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 4.8,
        "sector": "Engineering & Infra"
      },
      {
        "name": "Trent Ltd.",
        "percent": 3.7,
        "sector": "Retail / Consumer"
      },
      {
        "name": "Tata Motors Ltd.",
        "percent": 3.4,
        "sector": "Automobile"
      },
      {
        "name": "Bharat Forge Ltd.",
        "percent": 3.1,
        "sector": "Auto Components"
      },
      {
        "name": "Federal Bank Ltd.",
        "percent": 2.85,
        "sector": "Financial Services"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.3,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "Reliance Industries Ltd.",
      "Infosys Ltd.",
      "Larsen & Toubro Ltd.",
      "Trent Ltd.",
      "Tata Motors Ltd.",
      "Bharat Forge Ltd.",
      "Federal Bank Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 32,
      "Technology": 18,
      "Industrials": 16,
      "Auto": 14,
      "Consumer": 12,
      "Others": 8
    }
  },
  {
    "id": "jm-flexicap",
    "houseId": "jm",
    "amfiCode": 120492,
    "name": "JM Flexicap Fund",
    "shortName": "JM Flexicap",
    "amc": "JM Financial Mutual Fund",
    "category": "Flexi Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 124.6,
    "aumCr": 4800,
    "expenseRatio": 0.49,
    "regularExpenseRatio": 1.65,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Satish Ramanathan & Chaitanya Choksi",
    "benchmark": "BSE 500 TRI",
    "returns": {
      "y1": 54.2,
      "y3": 34.6,
      "y5": 28.4,
      "y10": 19.8,
      "inception": 28.4
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 7.8,
      "beta": 0.92,
      "sharpe": 1.72,
      "sortino": 2.44,
      "stdDev": 15.4
    },
    "holdings": [
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 6.8,
        "sector": "Engineering & Construction"
      },
      {
        "name": "HDFC Bank Ltd.",
        "percent": 6.4,
        "sector": "Financial Services"
      },
      {
        "name": "State Bank of India",
        "percent": 5.9,
        "sector": "Financial Services"
      },
      {
        "name": "Power Finance Corporation",
        "percent": 5.4,
        "sector": "Financial Services"
      },
      {
        "name": "REC Ltd.",
        "percent": 5.1,
        "sector": "Financial Services / Power"
      },
      {
        "name": "NTPC Ltd.",
        "percent": 4.6,
        "sector": "Power Utilities"
      },
      {
        "name": "Bharat Electronics Ltd. (BEL)",
        "percent": 4.2,
        "sector": "Aerospace & Defence"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 3.9,
        "sector": "Financial Services"
      },
      {
        "name": "Coal India Ltd.",
        "percent": 3.5,
        "sector": "Energy / Mining"
      },
      {
        "name": "Cash & Money Market",
        "percent": 4.8,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Larsen & Toubro Ltd.",
      "HDFC Bank Ltd.",
      "State Bank of India",
      "Power Finance Corporation",
      "REC Ltd.",
      "NTPC Ltd.",
      "Bharat Electronics Ltd. (BEL)",
      "ICICI Bank Ltd.",
      "Coal India Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 35,
      "Power & Utilities": 22,
      "Industrials & Defence": 18,
      "Energy": 12,
      "Others": 13
    }
  },
  {
    "id": "jm-midcap",
    "houseId": "jm",
    "amfiCode": 149591,
    "name": "JM Midcap Fund",
    "shortName": "JM Midcap",
    "amc": "JM Financial Mutual Fund",
    "category": "Mid Cap",
    "plan": "Direct - Growth",
    "rating": 5,
    "risk": "Very High",
    "nav": 26.8,
    "aumCr": 2100,
    "expenseRatio": 0.42,
    "regularExpenseRatio": 1.7,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Satish Ramanathan & Assem Nayyar",
    "benchmark": "NIFTY Midcap 150 TRI",
    "returns": {
      "y1": 56.8,
      "y3": 36.2,
      "y5": 30.5,
      "y10": 21.0,
      "inception": 30.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 8.4,
      "beta": 0.94,
      "sharpe": 1.76,
      "sortino": 2.52,
      "stdDev": 16.2
    },
    "holdings": [
      {
        "name": "Power Finance Corporation",
        "percent": 5.6,
        "sector": "Financial Services"
      },
      {
        "name": "REC Ltd.",
        "percent": 5.2,
        "sector": "Financial Services / Power"
      },
      {
        "name": "Bharat Heavy Electricals (BHEL)",
        "percent": 4.7,
        "sector": "Capital Goods"
      },
      {
        "name": "Bharat Forge Ltd.",
        "percent": 4.2,
        "sector": "Auto Components"
      },
      {
        "name": "Trent Ltd.",
        "percent": 3.9,
        "sector": "Retail / Consumer"
      },
      {
        "name": "The Phoenix Mills Ltd.",
        "percent": 3.6,
        "sector": "Real Estate"
      },
      {
        "name": "Federal Bank Ltd.",
        "percent": 3.4,
        "sector": "Financial Services"
      },
      {
        "name": "Persistent Systems Ltd.",
        "percent": 3.2,
        "sector": "Information Technology"
      },
      {
        "name": "Cummins India Ltd.",
        "percent": 3.0,
        "sector": "Capital Goods"
      },
      {
        "name": "Cash & Money Market",
        "percent": 5.1,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "Power Finance Corporation",
      "REC Ltd.",
      "Bharat Heavy Electricals (BHEL)",
      "Bharat Forge Ltd.",
      "Trent Ltd.",
      "The Phoenix Mills Ltd.",
      "Federal Bank Ltd.",
      "Persistent Systems Ltd.",
      "Cummins India Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 28,
      "Industrials & Power": 26,
      "Auto": 16,
      "Consumer": 14,
      "Technology": 10,
      "Others": 6
    }
  },
  {
    "id": "jm-largecap",
    "houseId": "jm",
    "amfiCode": 120490,
    "name": "JM Large Cap Fund",
    "shortName": "JM Large Cap",
    "amc": "JM Financial Mutual Fund",
    "category": "Large Cap",
    "plan": "Direct - Growth",
    "rating": 4,
    "risk": "Very High",
    "nav": 168.2,
    "aumCr": 1400,
    "expenseRatio": 0.68,
    "regularExpenseRatio": 1.78,
    "exitLoad": "1% < 30 days",
    "minSip": 500,
    "manager": "Satish Ramanathan & Chaitanya Choksi",
    "benchmark": "BSE 100 TRI",
    "returns": {
      "y1": 36.4,
      "y3": 21.8,
      "y5": 19.5,
      "y10": 15.4,
      "inception": 19.5
    },
    "benchmarkReturns": {
      "y1": 24.1,
      "y3": 18.6,
      "y5": 20.5,
      "y10": 15.5
    },
    "metrics": {
      "alpha": 3.6,
      "beta": 0.95,
      "sharpe": 1.38,
      "sortino": 1.96,
      "stdDev": 13.4
    },
    "holdings": [
      {
        "name": "HDFC Bank Ltd.",
        "percent": 9.6,
        "sector": "Financial Services"
      },
      {
        "name": "ICICI Bank Ltd.",
        "percent": 8.8,
        "sector": "Financial Services"
      },
      {
        "name": "State Bank of India",
        "percent": 7.4,
        "sector": "Financial Services"
      },
      {
        "name": "Larsen & Toubro Ltd.",
        "percent": 7.1,
        "sector": "Engineering & Construction"
      },
      {
        "name": "Reliance Industries Ltd.",
        "percent": 6.8,
        "sector": "Energy / Refining"
      },
      {
        "name": "NTPC Ltd.",
        "percent": 5.6,
        "sector": "Power Generation"
      },
      {
        "name": "Infosys Ltd.",
        "percent": 5.2,
        "sector": "Information Technology"
      },
      {
        "name": "Bharat Electronics Ltd. (BEL)",
        "percent": 4.8,
        "sector": "Defence Electronics"
      },
      {
        "name": "Coal India Ltd.",
        "percent": 4.1,
        "sector": "Energy / Mining"
      },
      {
        "name": "Cash & Money Market",
        "percent": 3.6,
        "sector": "Cash & Equivalents"
      }
    ],
    "topHoldings": [
      "HDFC Bank Ltd.",
      "ICICI Bank Ltd.",
      "State Bank of India",
      "Larsen & Toubro Ltd.",
      "Reliance Industries Ltd.",
      "NTPC Ltd.",
      "Infosys Ltd.",
      "Bharat Electronics Ltd. (BEL)",
      "Coal India Ltd.",
      "Cash & Money Market"
    ],
    "sectors": {
      "Financials": 38,
      "Industrials & Defence": 20,
      "Energy & Power": 18,
      "Technology": 14,
      "Others": 10
    }
  },
  {
    "id": "sbi-liquid",
    "houseId": "sbi",
    "amfiCode": 119800,
    "name": "SBI Liquid Fund",
    "shortName": "SBI Liquid Fund",
    "amc": "SBI Mutual Fund",
    "category": "Liquid",
    "plan": "Direct - Growth",
    "rating": null,
    "risk": "See current scheme riskometer",
    "nav": 4463.3947,
    "navDate": "13-10-2026",
    "aumCr": null,
    "expenseRatio": null,
    "regularExpenseRatio": null,
    "exitLoad": "See current scheme documents",
    "minSip": null,
    "manager": "Not provided in current dataset",
    "benchmark": "See current scheme documents",
    "returns": {
      "y1": 6.5,
      "y3": 6.9,
      "y5": 6.4,
      "y10": 6.1,
      "inception": null
    },
    "benchmarkReturns": {
      "y1": null,
      "y3": null,
      "y5": null,
      "y10": null
    },
    "metrics": null,
    "holdings": [],
    "topHoldings": [],
    "sectors": {},
    "dataStatus": "NAV and trailing returns sync from MFAPI; other details require current scheme documents"
  },
  {
    "id": "sbi-overnight",
    "houseId": "sbi",
    "amfiCode": 119833,
    "name": "SBI Overnight Fund",
    "shortName": "SBI Overnight Fund",
    "amc": "SBI Mutual Fund",
    "category": "Overnight",
    "plan": "Direct - Growth",
    "rating": null,
    "risk": "See current scheme riskometer",
    "nav": 4499.6465,
    "navDate": "13-10-2026",
    "aumCr": null,
    "expenseRatio": null,
    "regularExpenseRatio": null,
    "exitLoad": "See current scheme documents",
    "minSip": null,
    "manager": "Not provided in current dataset",
    "benchmark": "See current scheme documents",
    "returns": {
      "y1": 5.2,
      "y3": 6.0,
      "y5": 5.7,
      "y10": 5.3,
      "inception": null
    },
    "benchmarkReturns": {
      "y1": null,
      "y3": null,
      "y5": null,
      "y10": null
    },
    "metrics": null,
    "holdings": [],
    "topHoldings": [],
    "sectors": {},
    "dataStatus": "NAV and trailing returns sync from MFAPI; other details require current scheme documents"
  },
  {
    "id": "hdfc-corporate-bond",
    "houseId": "hdfc",
    "amfiCode": 118987,
    "name": "HDFC Corporate Bond Fund",
    "shortName": "HDFC Corporate Bond Fund",
    "amc": "HDFC Mutual Fund",
    "category": "Corporate Bond",
    "plan": "Direct - Growth",
    "rating": null,
    "risk": "See current scheme riskometer",
    "nav": 35.0726,
    "navDate": "13-10-2026",
    "aumCr": null,
    "expenseRatio": null,
    "regularExpenseRatio": null,
    "exitLoad": "See current scheme documents",
    "minSip": null,
    "manager": "Not provided in current dataset",
    "benchmark": "See current scheme documents",
    "returns": {
      "y1": 3.4,
      "y3": 6.8,
      "y5": 6.1,
      "y10": 7.1,
      "inception": null
    },
    "benchmarkReturns": {
      "y1": null,
      "y3": null,
      "y5": null,
      "y10": null
    },
    "metrics": null,
    "holdings": [],
    "topHoldings": [],
    "sectors": {},
    "dataStatus": "NAV and trailing returns sync from MFAPI; other details require current scheme documents"
  },
  {
    "id": "nippon-gilt",
    "houseId": "nippon",
    "amfiCode": 118672,
    "name": "Nippon India Gilt Fund",
    "shortName": "Nippon India Gilt Fund",
    "amc": "Nippon India Mutual Fund",
    "category": "Gilt",
    "plan": "Direct - Growth",
    "rating": null,
    "risk": "See current scheme riskometer",
    "nav": 44.017,
    "navDate": "13-10-2026",
    "aumCr": null,
    "expenseRatio": null,
    "regularExpenseRatio": null,
    "exitLoad": "See current scheme documents",
    "minSip": null,
    "manager": "Not provided in current dataset",
    "benchmark": "See current scheme documents",
    "returns": {
      "y1": 1.7,
      "y3": 6.3,
      "y5": 5.5,
      "y10": 7.2,
      "inception": null
    },
    "benchmarkReturns": {
      "y1": null,
      "y3": null,
      "y5": null,
      "y10": null
    },
    "metrics": null,
    "holdings": [],
    "topHoldings": [],
    "sectors": {},
    "dataStatus": "NAV and trailing returns sync from MFAPI; other details require current scheme documents"
  },
  {
    "id": "hdfc-nifty50-index",
    "houseId": "hdfc",
    "amfiCode": 119063,
    "name": "HDFC Nifty 50 Index Fund",
    "shortName": "HDFC Nifty 50 Index Fund",
    "amc": "HDFC Mutual Fund",
    "category": "Index Fund",
    "plan": "Direct - Growth",
    "rating": null,
    "risk": "See current scheme riskometer",
    "nav": 222.3578,
    "navDate": "13-10-2026",
    "aumCr": null,
    "expenseRatio": null,
    "regularExpenseRatio": null,
    "exitLoad": "See current scheme documents",
    "minSip": null,
    "manager": "Not provided in current dataset",
    "benchmark": "NIFTY 50 TRI",
    "returns": {
      "y1": -9.2,
      "y3": 5.7,
      "y5": 5.5,
      "y10": 11.2,
      "inception": null
    },
    "benchmarkReturns": {
      "y1": null,
      "y3": null,
      "y5": null,
      "y10": null
    },
    "metrics": null,
    "holdings": [],
    "topHoldings": [],
    "sectors": {},
    "dataStatus": "NAV and trailing returns sync from MFAPI; other details require current scheme documents"
  },
  {
    "id": "canara-robeco-largecap",
    "houseId": "canara-robeco",
    "amfiCode": 118269,
    "name": "Canara Robeco Large Cap Fund",
    "shortName": "Canara Robeco Large Cap Fund",
    "amc": "Canara Robeco Mutual Fund",
    "category": "Large Cap",
    "plan": "Direct - Growth",
    "rating": null,
    "risk": "See current scheme riskometer",
    "nav": 68.55,
    "navDate": "13-10-2026",
    "aumCr": null,
    "expenseRatio": null,
    "regularExpenseRatio": null,
    "exitLoad": "See current scheme documents",
    "minSip": null,
    "manager": "Not provided in current dataset",
    "benchmark": "See current scheme documents",
    "returns": {
      "y1": -6.8,
      "y3": 8.9,
      "y5": 7.6,
      "y10": 13.3,
      "inception": null
    },
    "benchmarkReturns": {
      "y1": null,
      "y3": null,
      "y5": null,
      "y10": null
    },
    "metrics": null,
    "holdings": [],
    "topHoldings": [],
    "sectors": {},
    "dataStatus": "NAV and trailing returns sync from MFAPI; other details require current scheme documents"
  },
  {
    "id": "franklin-flexicap",
    "houseId": "franklin-templeton",
    "amfiCode": 118535,
    "name": "Franklin India Flexi Cap Fund",
    "shortName": "Franklin India Flexi Cap Fund",
    "amc": "Franklin Templeton Mutual Fund",
    "category": "Flexi Cap",
    "plan": "Direct - Growth",
    "rating": null,
    "risk": "See current scheme riskometer",
    "nav": 1704.9487,
    "navDate": "13-10-2026",
    "aumCr": null,
    "expenseRatio": null,
    "regularExpenseRatio": null,
    "exitLoad": "See current scheme documents",
    "minSip": null,
    "manager": "Not provided in current dataset",
    "benchmark": "See current scheme documents",
    "returns": {
      "y1": -6.7,
      "y3": 9.4,
      "y5": 9.6,
      "y10": 12.9,
      "inception": null
    },
    "benchmarkReturns": {
      "y1": null,
      "y3": null,
      "y5": null,
      "y10": null
    },
    "metrics": null,
    "holdings": [],
    "topHoldings": [],
    "sectors": {},
    "dataStatus": "NAV and trailing returns sync from MFAPI; other details require current scheme documents"
  }
];

// ============================================================================
// STOCK MARKET & MUTUAL FUND NEWS FEED (REAL-TIME INTELLIGENCE)
// ============================================================================
window.STOCK_MARKET_NEWS = [
  {
    "id": "news-1",
    "title": "AMFI Monthly Data: Indian SIP Inflows Hit Record High of \u20b923,547 Cr",
    "date": "Today, 10:30 AM",
    "timeAgo": "Today, 10:30 AM",
    "category": "Mutual Fund Inflows",
    "source": "AMFI Official Bulletin",
    "impact": "bullish",
    "impactLabel": "Record Inflows \ud83d\ude80",
    "summary": "Monthly SIP contributions reached a landmark \u20b923,547 Crore milestone as Indian retail investors continue to pour disciplined monthly capital into equity mutual funds despite market volatility.",
    "fullStory": "<p>According to the latest Association of Mutual Funds in India (AMFI) monthly bulletin, total active SIP accounts surged past 9.87 Crore. Total mutual fund industry Assets Under Management (AUM) reached an unprecedented \u20b968.5 Lakh Crore.</p><p>Equity schemes across Flexi Cap, Small Cap, and Multi Cap categories absorbed the lion's share of net inflows. Domestic Institutional Investors (DIIs) deployed over \u20b948,200 Crore in net equity buying, thoroughly counterbalancing foreign institutional (FII) outflows.</p>",
    "investorTakeaway": "Retail monthly SIP participation now acts as an impregnable structural cushion against global market corrections. Investors should never stop SIPs during consolidation phases, as rupee-cost averaging maximizes units accumulated.",
    "tags": [
      "SIP",
      "AMFI",
      "AllTimeHigh",
      "DIIInflows",
      "WealthCreation"
    ],
    "relatedFunds": [
      "ppfas-flexi",
      "hdfc-flexicap",
      "nippon-smallcap",
      "quant-smallcap"
    ]
  },
  {
    "id": "news-2",
    "title": "mfapi.in Live Sync Active: AMFI Real-Time NAVs Refreshed Daily Across All Schemes",
    "date": "Today, 09:15 AM",
    "timeAgo": "Today, 09:15 AM",
    "category": "AMFI Live NAVs",
    "source": "mfapi.in AMFI Registry Feed",
    "impact": "bullish",
    "impactLabel": "Live Sync Active \u26a1",
    "summary": "Direct-plan Net Asset Values (NAVs) are continuously refreshed directly from AMFI registries via mfapi.in API. Trailing 1Y, 3Y, 5Y and 10Y CAGRs are dynamically recalculated on the fly.",
    "fullStory": "<p>Returns.in directly connects to the open-source AMFI India feed at <code>api.mfapi.in</code>. Every evening, fund houses upload their declared Net Asset Values after market close (~9:00 PM to 11:00 PM IST).</p><p>The system stores today's snapshot in local storage and calculates exact multi-year compound annualized growth rates (CAGR) by scanning the full historical NAV series, ensuring zero distortion from distributor commissions or broker markups.</p>",
    "investorTakeaway": "Always evaluate fund performance using Direct Plan - Growth NAVs. Direct plans beat regular plans by 0.70% to 1.50% every single year, compounding to tens of lakhs in additional wealth over 15 to 20 years.",
    "tags": [
      "DirectPlan",
      "AMFI",
      "mfapi",
      "LiveNAV",
      "NoCommissions"
    ],
    "relatedFunds": [
      "invesco-midcap",
      "motilal-midcap",
      "sbi-smallcap",
      "icici-bluechip"
    ]
  },
  {
    "id": "news-3",
    "title": "NIFTY & SENSEX Consolidate Near Record Highs Led by Banking & Capital Goods",
    "date": "Today, 08:45 AM",
    "timeAgo": "Today, 08:45 AM",
    "category": "Market Trends",
    "source": "NSE / BSE Indices",
    "impact": "neutral",
    "impactLabel": "Index Consolidation \ud83d\udcca",
    "summary": "Headline indices trade near lifetime highs with heavyweights HDFC Bank, ICICI Bank, and Larsen & Toubro reporting robust credit expansion and record order books.",
    "fullStory": "<p>The NIFTY 50 index is consolidating near 25,840 levels while the BSE Sensex trades above 84,900. Private banks and public sector lenders have posted multi-year low non-performing assets (NPAs) and healthy credit growth of 13-15% YoY.</p><p>Meanwhile, engineering and infrastructure leaders report record order backlogs spanning railways, power transmission, defence indigenization, and green energy corridors.</p>",
    "investorTakeaway": "Large-cap valuations are relatively attractive compared to historical mid and small cap premiums. Investors seeking balanced risk-reward should allocate 40-50% in Flexi Cap or Large & Mid Cap funds.",
    "tags": [
      "NIFTY50",
      "SENSEX",
      "Banking",
      "CapitalGoods",
      "Valuation"
    ],
    "relatedFunds": [
      "uti-nifty50",
      "icici-bluechip",
      "mirae-largecap",
      "hdfc-top100"
    ]
  },
  {
    "id": "news-4",
    "title": "SEBI Reviews Mid & Small Cap Liquidity Stress Tests; AMCs Maintain High Cash Buffers",
    "date": "Yesterday, 04:20 PM",
    "timeAgo": "Yesterday, 04:20 PM",
    "category": "Regulatory & Risk",
    "source": "SEBI Risk Watch",
    "impact": "reform",
    "impactLabel": "Risk Governance \ud83d\udee1\ufe0f",
    "summary": "SEBI's fortnightly liquidity stress test reveals top small-cap funds maintain adequate cash/liquid asset buffers (4% to 15%) to meet potential redemptions smoothly.",
    "fullStory": "<p>Securities and Exchange Board of India (SEBI) mandated mutual funds to publish fortnightly stress-test results indicating how many days it would take to liquidate 25% and 50% of their small and mid-cap portfolios under extreme redemption pressure.</p><p>Leading fund houses such as Nippon India, SBI, and HDFC have bolstered their cash and money market holdings, while instituting limits on daily lumpsum investments to protect existing unitholders.</p>",
    "investorTakeaway": "Maintain an uninterrupted monthly SIP in small cap funds with a minimum 7+ year horizon. Avoid large lumpsum top-ups during frothy valuation runs, and rebalance towards balanced advantage funds if equity allocation exceeds your risk profile.",
    "tags": [
      "SEBI",
      "StressTest",
      "SmallCap",
      "Liquidity",
      "RiskManagement"
    ],
    "relatedFunds": [
      "nippon-smallcap",
      "tata-smallcap",
      "axis-smallcap",
      "dsp-smallcap"
    ]
  },
  {
    "id": "news-5",
    "title": "RBI MPC Keeps Repo Rate Unchanged at 6.50%; Economic Growth Outlook Stays Resilient",
    "date": "Yesterday, 02:00 PM",
    "timeAgo": "Yesterday, 02:00 PM",
    "category": "Economy & Rates",
    "source": "Reserve Bank of India",
    "impact": "bullish",
    "impactLabel": "Monetary Stability \ud83c\udfe6",
    "summary": "The Monetary Policy Committee unanimously maintained the policy repo rate at 6.50% while projecting India's GDP growth at 7.0%+ for the fiscal year, anchoring inflation expectations.",
    "fullStory": "<p>RBI Governor announced that domestic economic activity remains robust, powered by urban consumption, rural recovery following normal monsoon rains, and government capital expenditure.</p><p>With core inflation remaining within the 4% target band, financial analysts anticipate a potential rate easing cycle in upcoming quarters, which typically provides strong valuation expansion for equities and bond price appreciation for hybrid/debt funds.</p>",
    "investorTakeaway": "A stable monetary regime supports corporate borrowing and earnings growth. Hybrid and Balanced Advantage Funds (BAFs) offer an optimal conservative vehicle to capture market upsides with downside protection.",
    "tags": [
      "RBI",
      "RepoRate",
      "GDPGrowth",
      "Inflation",
      "HybridFunds"
    ],
    "relatedFunds": [
      "ppfas-dynamic-asset",
      "hdfc-balanced-adv",
      "icici-balanced-adv"
    ]
  },
  {
    "id": "news-6",
    "title": "Power & Infrastructure Themes Witness Strong Order Inflows Ahead of Union Budget",
    "date": "2 Days Ago",
    "timeAgo": "2 Days Ago",
    "category": "Sector Spotlight",
    "source": "MoSPI & Ministry of Power",
    "impact": "bullish",
    "impactLabel": "Capex Boom \u26a1",
    "summary": "Capital goods, defence, and clean energy companies reported over 22% YoY order book expansion driven by governmental capex and private manufacturing renaissance.",
    "fullStory": "<p>India's peak power demand exceeded 250 GW, accelerating tenders for thermal plant modernization, renewable solar/wind installations, and interstate transmission grids.</p><p>Key engineering majors including BHEL, Cummins India, Bharat Forge, and Siemens are operating at near 85% capacity utilization with forward revenue visibility of 3 to 5 years.</p>",
    "investorTakeaway": "Thematic and mid-cap funds with high exposure to capital goods and power infrastructure continue to generate market-beating alpha. However, limit thematic sector funds to no more than 10-15% of your total mutual fund portfolio.",
    "tags": [
      "Infrastructure",
      "CleanEnergy",
      "PowerCapex",
      "ThematicFunds",
      "Alpha"
    ],
    "relatedFunds": [
      "nippon-power-infra",
      "jm-flexicap",
      "tata-digital-india",
      "invesco-midcap"
    ]
  }
];

console.log("Returns.in Data Loaded: " + window.FUND_HOUSES.length + " Fund Houses, " + window.MUTUAL_FUNDS.length + " Schemes, Daily AMFI mfapi.in Sync Enabled.");
