# kmb-app

# Summary:

This is a mobile application that mimics the KMB app, developed using
\'Expo\', \'React Native\', \'UI Kitten, etc., and features support for
switching between different languages.

# Installation and Execution Steps:

1.  In the terminal, enter \'npm install\' to install all dependencies
    listed in the \'package.json\' file.

2.  Install \'Expo Go\' on your mobile phone or iPad (optional).

3.  There are four ways to open the application:

    a.  In the terminal, enter \'npm start\', then open \'Expo Go\' and
         scan the QR Code.

    b.  If you have \'Android Studio\' installed, enter \`npm run
         android\` in the terminal to open the \'Android Emulator\'.

    c.  If you have \'Xcode\' installed, enter \`npm run ios\` in the
         terminal to open the simulator.

    d.  If you are using an Android system on your phone, you can
         download and install the APK file through the following link:
         \"https://expo.dev/artifacts/eas/8eCQRQ9cmuXtkCZZev3s5n.apk".

# Background:

-   All data were found in
    \"https://data.gov.hk/tc-data/dataset/hk-td-tis_21-etakmb".

-   For simplicity, support 2 bus stops (荃景圍天橋 and 荃灣柴灣角街 )
    only.

# Description:

-   This applications are primarily composed of two components: \"Home\"
    and \"Detail.\"

-   Using \"react-i18next,\" it supports switching between \"English,\"
    \"Traditional Chinese,\" and \"Simplified Chinese.\"

-   It includes features: \"loading indicators\" and \"tablet view
    support.\"

# Home component:

-   Use the \"VirtualizedList\" for implementing \"Bus Listing\" for the
    following reasons:

    a.  VirtualizedList only renders the elements currently visible on the
     screen, not all the data of the entire list, which can reduce the
     rendering load.

    b.  As users scroll through the list, the component will render data on
     demand. This lazy loading method can reduce initial load time and
     save memory.

    c.  Since it is not necessary to render all data at once, memory usage
     can be optimized.

-   Display the route number, destination, bus stop name, and ETA of the
    next bus for each row.

-   List the stops in order from nearest to farthest based on the
    user\'s distance from the bus stations.

-   Supports vertical scrolling and can be pulled down to refresh.

-   When an item is clicked, it navigates to Detail component.

-   Automatically updates the data every 30 seconds.

# Detail component:

-   This component is primarily composed of two components: Map and
    List.

-   In the Map component, the react-native-maps library is used to
    provide mapping capabilities, displaying the locations of various
    bus stops and the user\'s real-time position. The reasons for
    choosing react-native-maps are as follows:

    a.  Since it\'s community-maintained, react-native-maps has robust
     community support with continual contributions and updates.

    b.  It integrates relatively easily with React Native applications, and
     there are many available guides and tutorials.

    c.  For basic functionalities, there are no additional costs involved
     (although fees may apply for Google Maps API if usage exceeds the
     free quota).

    d.  Comparing the NPM Weekly Downloads, react-native-maps has a higher
     download count.

-   In the List component, it displays a complete ETA list for the bus
    route selected by the user, which automatically updates every 30
    seconds. When a user clicks on an item (bus stop), the map responds
    in real-time and moves to the location of that bus stop.
