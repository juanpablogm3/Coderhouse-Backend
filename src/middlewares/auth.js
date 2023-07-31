export function isUser(req, res, next) {
    if (req.session?.user?.role==='user') {
      return next();
    }
    return res.status(401).render('error', { error: 'error de autenticacion!' });
}
  
export function isAdmin(req, res, next) {
    if (req.session?.user?.role==='admin') {
      return next();
    }
    return res.status(403).render('error', { error: 'error de autorización!' });
}

export function isUserOrAdmin(req, res, next) {
  if (req.session?.user?.role==='user'||'admin') {
    return next();
  }
  return res.status(401).render('error', { error: 'error de autenticacion!' });
}