import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { produceKafkaEvent } from '@shared/kafka';
import { sendSuccess } from '@shared/middlewares/utils/src/lib/response';
import { KAFKA_TOPICS } from '@shared/middlewares/kafka/src/index';
import { PrismaClient,UserRole } from '../../../generated/user-service';

// 📝 POST /api/users/register
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.registerUser(req.body);

    // Emit generic user registration event
    await produceKafkaEvent({
      topic: KAFKA_TOPICS.USER.CREATED,
      messages: [
        {
          key: user.id.toString(),
          value: JSON.stringify(user), // Pass the user object, not `{ ... }`
        },
      ],
    });

    // If the registered user is a seller (not vendor)
    if (user.role === UserRole.seller) {
      await produceKafkaEvent({
        topic: KAFKA_TOPICS.USER.VENDOR_REGISTERED, // Nested under USER
        messages: [
          {
            key: user.id.toString(),
            value: JSON.stringify({
              userId: user.id,
              email: user.email,
              phone: req.body.phone,
              status: 'pending',
            }),
          },
        ],
      });
    }

    return sendSuccess(res, 'User registered successfully', user);
  } catch (err) {
    next(err);
  }
};

// 🔐 POST /api/users/login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await userService.loginUser(req.body);
    return sendSuccess(res, 'Login successful', { token });
  } catch (err) {
    next(err);
  }
};

// 🙋‍♂️ GET /api/users/profile
export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserProfile(req.user!.userId);
    return sendSuccess(res, 'Profile fetched successfully', user);
    console.log('[getProfile] req.user:', req.user);
  } catch (err) {
    next(err);
  }
};

// 🔁 PATCH /api/users/:id/role
export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await userService.updateUserRole(
      req.params.id,
      req.body.role
    );
    return sendSuccess(res, 'User role updated successfully', updated);
  } catch (err) {
    next(err);
  }
};
