class Test
{
    constructor(router)
    {
        router.get('/', this.testRoot.bind(this));
        router.get("/nest", this.testNest.bind(this));
    }

    testRoot(request, response)
    {
        response.send("root pass");
    }

    testNest(request, response)
    {
        response.send("nest pass");
    }
}

module.exports = Test;
