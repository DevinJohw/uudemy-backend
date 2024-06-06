import prisma from '@/lib/prisma';

// Create a user
export async function createUser({ email, password }: { email: string; password: string }) {
  return await prisma.$transaction(async prisma => {
    return await prisma.user.create({
      data: {
        email,
        password,
        profile: {
          create: {},
        },
        balance: {
          create: {},
        },
      },
      select: {
        id: true,
        email: true,
        profile: {
          select: {
            avatar: true,
          },
        },
        balance: {
          select: {
            balance: true,
          },
        },
      },
    });
  });
}

// Read
export async function queryUserById({ id }: { id: string }) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      profile: {
        select: {
          avatar: true,
        },
      },
      balance: {
        select: {
          balance: true,
        },
      },
    },
  });
}

// Update avatar
export async function updateUserAvatar({ id, avatar }: { id: string; avatar: string }) {
  return prisma.profile.update({
    where: {
      userId: id,
    },
    data: {
      avatar,
    },
    select: {
      userId: true,
      avatar: true,
    },
  });
}

// Update balance
export async function updateUserBalance({ id, balance }: { id: string; balance: number }) {
  return prisma.balance.update({
    where: {
      userId: id,
    },
    data: {
      balance,
    },
    select: {
      userId: true,
      balance: true,
    },
  });
}

// Update password
export async function updateUserPassword({ id, password }: { id: string; password: string }) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
    select: {
      id: true,
      password: true,
    },
  });
}

// Delete a user
export async function deleteUser({ id }: { id: string }) {
  return await prisma.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      profile: {
        select: {
          avatar: true,
        },
      },
      balance: {
        select: {
          balance: true,
        },
      },
    },
  });
}
