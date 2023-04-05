export function createcontact(req, res, next) {
    res.status(200).json({message: 'create contact'})
    next()
}

export function getallcontact(req, res, next) {
    res.status(200).json({message: 'get all contact'})
    next()
}

export function getcontact(req, res, next) {
    var idno = req.params['id']
    res.status(200).json({contactid: idno , contactname: 'Reynald', contactaddress: 'Quezon City'})
    next()
}

export function updatecontact(req, res, next) {
    res.status(200).json({message: 'update contact'})
    next()
}

export function deletecontact(req, res, next) {
    res.status(200).json({message: 'delete contact'})
    next()
}
