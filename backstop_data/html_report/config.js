report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_violation_overview_0_document_0_phone.png",
        "test": "../bitmaps_test/20241112-161246/backstop_default_violation_overview_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_violation_overview_0_document_0_phone.png",
        "label": "violation_overview",
        "requireSameDimensions": false,
        "misMatchThreshold": 1,
        "url": "http://localhost:3000/creator-center/violation/overview/",
        "referenceUrl": "http://localhost:3000/creator-center/violation/overview/",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": 117
          },
          "rawMisMatchPercentage": 21.521103896103895,
          "misMatchPercentage": "21.52",
          "analysisTime": 13
        },
        "diffImage": "../bitmaps_test/20241112-161246/failed_diff_backstop_default_violation_overview_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_violation_overview_0_document_1_tablet.png",
        "test": "../bitmaps_test/20241112-161246/backstop_default_violation_overview_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_violation_overview_0_document_1_tablet.png",
        "label": "violation_overview",
        "requireSameDimensions": false,
        "misMatchThreshold": 1,
        "url": "http://localhost:3000/creator-center/violation/overview/",
        "referenceUrl": "http://localhost:3000/creator-center/violation/overview/",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": 273
          },
          "rawMisMatchPercentage": 17.07630462191985,
          "misMatchPercentage": "17.08",
          "analysisTime": 105
        },
        "diffImage": "../bitmaps_test/20241112-161246/failed_diff_backstop_default_violation_overview_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});