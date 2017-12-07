class Sample
{
    constructor(router)
    {
        router.get('/', this.sampleRoot.bind(this));
        router.get("/nest", this.sampleNest.bind(this));
    }

    sampleRoot(request, response)
    {
        response.send("There's no place like home.");
    }

    sampleNest(request, response)
    {
        response.send("But it's time to leave the nest!");
    }
}

module.exports = Sample;
