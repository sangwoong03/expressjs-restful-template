module.exports = class AuthController {
  constructor(service) {
    this.authService = service.authService;
  }

  async signUp(req, res) {
    const signUpDto = req.body;

    try {
      await this.authService.signUp(signUpDto);
      return res.status(201).end();
    } catch (err) {
      return res.status(409).json({ error: err.message });
    }
  }

  async signIn(req, res) {
    const signInDto = req.body;

    try {
      const token = await this.authService.signIn(signInDto);
      return res.status(200).json({
        status: 'ok',
        access_token: token,
      });
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  }

  async kakaoSignIn(req, res) {
    const kakaoToken = req.headers.authorization;

    if (!kakaoToken) {
      return res.status(400).json({ error: 'Invalid Authorization Header' });
    }

    const kakaoSignInDto = { kakaoToken };

    try {
      const token = await this.authService.kakaoSignIn(kakaoSignInDto);
      return res.status(200).json({ access_token: token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  createEndpoints(app, routerFactory) {
    const subRouter = routerFactory.Router();

    subRouter.post('/login', this.signIn);
    subRouter.post('/kakao/login', this.kakaoSignIn);

    app.use('/api/auth', subRouter);
  }
};
