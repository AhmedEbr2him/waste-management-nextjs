import {
    integer,
    varchar,
    pgTable,
    serial,
    text,
    timestamp,
    jsonb,
    boolean,
} from 'drizzle-orm/pg-core';

export const UsersSchema = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const ReportsSchema = pgTable('reports', {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
        .references(() => UsersSchema.id)
        .notNull(),
    location: text('location').notNull(),
    wasteType: varchar('waste_type', { length: 255 }).notNull(),
    reportsAmount: varchar('amount', { length: 255 }).notNull(),
    imageUrl: text('image_url').notNull(),
    verificationResult: jsonb('verification_result'),
    status: varchar('status', { length: 255 }).notNull().default('pending'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    collectorId: integer('collector_id')
        .references(() => UsersSchema.id)
        .notNull(),
});

export const RewardsSchema = pgTable('rewards', {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
        .references(() => UsersSchema.id)
        .notNull(),
    points: integer('points').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    isAvaliable: boolean('is_avaliable').notNull().default(true),
    description: text('description').notNull(),
    name: varchar('reward_name', { length: 255 }).notNull(),
    collectionInfo: text('collection_info').notNull(),
});

export const CollectedWastesSchema = pgTable('collected_waste', {
    id: serial('id').primaryKey(),
    reportId: integer('report_id')
        .references(() => ReportsSchema.id)
        .notNull(),
    collecterId: integer('user_id')
        .references(() => UsersSchema.id)
        .notNull(),
    collectionData: timestamp('collection_date').notNull(),
    status: varchar('status', { length: 255 }).notNull().default('collected'),
});

export const NotificationsSchema = pgTable('notification', {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
        .references(() => UsersSchema.id)
        .notNull(),
    message: text('message').notNull(),
    type: varchar('type', { length: 50 }).notNull(),
    isRead: boolean('is_read').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const TransactionsSchema = pgTable('transaction', {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
        .references(() => UsersSchema.id)
        .notNull(),
    type: varchar('type', { length: 50 }).notNull(),
    amount: integer('amount').notNull(),
    description: text('description').notNull(),
    date: timestamp('date').defaultNow().notNull(),
});
