import authService, { AuthService } from './auth.service'
import userService, { UserService } from './user.service'

export interface Services {
	auth: AuthService
	user: UserService
}

const services: Services = {
	auth: authService,
	user: userService
}

export default services
