report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_violation_overview_0_document_0_phone.png",
        "test": "../bitmaps_test/20241113-111932/backstop_default_violation_overview_0_document_0_phone.png",
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
            "height": 122
          },
          "rawMisMatchPercentage": 20.857945306725796,
          "misMatchPercentage": "20.86",
          "analysisTime": 21
        },
        "diffImage": "../bitmaps_test/20241113-111932/failed_diff_backstop_default_violation_overview_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_violation_overview_0_document_1_tablet.png",
        "test": "../bitmaps_test/20241113-111932/backstop_default_violation_overview_0_document_1_tablet.png",
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
            "height": 266
          },
          "rawMisMatchPercentage": 17.095396908001625,
          "misMatchPercentage": "17.10",
          "analysisTime": 105
        },
        "diffImage": "../bitmaps_test/20241113-111932/failed_diff_backstop_default_violation_overview_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});