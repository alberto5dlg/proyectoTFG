

module.exports = ( req, res ) => {
    res.status(200).send('API REST para proyecto TFG');
};


//MODULO PARA CUANDO SE INTEGRE ANGULAR
/*const allRoutes = [
    '/'
];

module.exports = ( router ) => {
     route for retrieving Angular partials
    router.get( '/views/:fileName', ( req, res ) => {
        res.render( req.params.fileName );
    });
    router.get( allRoutes, ( req, res ) => res.render( 'layout' ));
    router.get(allRoutes, (req, res) => res.send("API REST para el proyecto TFG"));
    return router;

};*/