report({
  testSuite: "BackstopJS",
  tests: [
    {
      pair: {
        reference:
          "../bitmaps_reference/backstop_default_violation_overview_0__0_phone.png",
        test: "../bitmaps_test/20241113-102851/backstop_default_violation_overview_0__0_phone.png",
        selector: "",
        fileName: "backstop_default_violation_overview_0__0_phone.png",
        label: "violation_overview",
        requireSameDimensions: false,
        misMatchThreshold: 1,
        url: "http://localhost:3000/creator-center/violation/overview/",
        referenceUrl:
          "http://localhost:3000/creator-center/violation/overview/",
        expect: 0,
        viewportLabel: "phone",
        engineErrorMsg:
          "net::ERR_CONNECTION_REFUSED at http://localhost:3000/creator-center/violation/overview/",
        error:
          "Reference file not found /Users/jiangdong.chen/Desktop/node/vite-ui-check/backstop_data/bitmaps_reference/backstop_default_violation_overview_0__0_phone.png",
      },
      status: "fail",
    },
    {
      pair: {
        reference:
          "../bitmaps_reference/backstop_default_violation_overview_0__1_tablet.png",
        test: "../bitmaps_test/20241113-102851/backstop_default_violation_overview_0__1_tablet.png",
        selector: "",
        fileName: "backstop_default_violation_overview_0__1_tablet.png",
        label: "violation_overview",
        requireSameDimensions: false,
        misMatchThreshold: 1,
        url: "http://localhost:3000/creator-center/violation/overview/",
        referenceUrl:
          "http://localhost:3000/creator-center/violation/overview/",
        expect: 0,
        viewportLabel: "tablet",
        engineErrorMsg:
          "net::ERR_CONNECTION_REFUSED at http://localhost:3000/creator-center/violation/overview/",
        error:
          "Reference file not found /Users/jiangdong.chen/Desktop/node/vite-ui-check/backstop_data/bitmaps_reference/backstop_default_violation_overview_0__1_tablet.png",
      },
      status: "fail",
    },
  ],
  id: "backstop_default",
});
