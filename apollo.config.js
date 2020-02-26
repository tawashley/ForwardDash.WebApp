module.exports = {
    client: {
        name: 'forward-dash-webapp',
        addTypename: false,
        service: {
            name: 'forward-dash-graphql',
            url: 'http://localhost:4000/graphql',
        },
        includes: ["src/**/*.ts*"]
    }
}
