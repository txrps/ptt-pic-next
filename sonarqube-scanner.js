const scanner = require('sonarqube-scanner');
scanner({
        serverUrl: "http://localhost:9000",
        token: "sqp_7815da5c21864f4f10a2508bab2b35baa2f37589",
        login: "admin",
        password: "dewis@1234",
        options: {
            "sonar.login": "admin",
            "sonar.password": "dewis@1234",
            "sonar.projectName": "PTT-PIC-FrontEnd",
            "sonar.projectDescription": "Just for demo...",
            "sonar.sourceEncoding": "UTF-8",
            "sonar.sources": "./app"
        },
    },
    () => process.exit()
);