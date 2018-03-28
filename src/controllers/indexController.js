
/**
 * Simple index return
 * @returns {Object}    Returns a greeting
 */
async function index(req, res, next) {
  try { 
    log.info("Loggin Howdie Ho");
    res.send({msg: "Howdie Ho!"});
    return next();
  }catch(e) {
    res.status(500).send({error: "Error"});
    return next(err);
  }
}

module.exports = {
  index
};
