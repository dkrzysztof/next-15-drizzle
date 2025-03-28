import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
	id: serial('id').primaryKey(),
	firstName: varchar('first_name', { length: 60 }),
	lastName: varchar('last_name', { length: 100 }).notNull(),
	initials: varchar('initials', { length: 30 }),
	email: varchar('email', { length: 100 }).notNull().unique(),
	status: varchar('status', { length: 8 }).notNull().default('ACTIVE').$type<'ACTIVE' | 'INACTIVE'>(),
	createdAt: timestamp('created_at', { withTimezone: false }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: false }).notNull().defaultNow()
});

export const usersAddressesTable = pgTable('users_addresses', {
	userId: integer('user_id')
		.references(() => usersTable.id, { onDelete: 'cascade' })
		.notNull(),
	addressType: varchar('address_type', { length: 7 }).notNull().$type<'HOME' | 'INVOICE' | 'POST' | 'WORK'>(),
	validFrom: timestamp('valid_from', { withTimezone: false }).notNull(),
	postCode: varchar('post_code', { length: 6 }).notNull(),
	city: varchar('city', { length: 60 }).notNull(),
	countryCode: varchar('country_code', { length: 3 }).notNull(),
	street: varchar('street', { length: 100 }).notNull(),
	buildingNumber: varchar('building_number', { length: 60 }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: false }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: false }).notNull().defaultNow()
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUserAddress = typeof usersAddressesTable.$inferInsert;
export type SelectUserAddress = typeof usersAddressesTable.$inferSelect;
