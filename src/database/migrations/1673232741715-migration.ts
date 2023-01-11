import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1673232741715 implements MigrationInterface {
    name = 'migration1673232741715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`image\` varchar(300) NOT NULL, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_5f468ae5696f07da025138e38f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`price\` decimal(10,2) NOT NULL DEFAULT '0.00', \`cost\` decimal(10,2) NOT NULL DEFAULT '0.00', \`stock\` int NOT NULL, \`image\` varchar(300) NOT NULL, \`create_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`product_brand_id\` int NULL, UNIQUE INDEX \`IDX_4c9fb58de893725258746385e1\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lines_order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(200) NOT NULL, \`qty\` int NOT NULL, \`price\` decimal(10,2) NOT NULL DEFAULT '0.00', \`cost\` decimal(10,2) NOT NULL DEFAULT '0.00', \`subtotal\` decimal(10,2) NOT NULL DEFAULT '0.00', \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`orderId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`status\` enum ('En Proceso', 'Finalizado', 'Anulado') NOT NULL DEFAULT 'En Proceso', \`dateEnd\` datetime NULL, \`total\` decimal(10,2) NOT NULL DEFAULT '0.00', \`userId\` int NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(100) NOT NULL, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customer_id\` int NULL, UNIQUE INDEX \`IDX_638bac731294171648258260ff\` (\`password\`), UNIQUE INDEX \`REL_d72eb2a5bbff4f2533a5d4caff\` (\`customer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products_category\` (\`product_id\` int NOT NULL, \`category_id\` int NOT NULL, INDEX \`IDX_8bc367fb7d5de5f3446b0ff708\` (\`product_id\`), INDEX \`IDX_bc2e048ffb4b013244d378ec16\` (\`category_id\`), PRIMARY KEY (\`product_id\`, \`category_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_products_products\` (\`categoryId\` int NOT NULL, \`productsId\` int NOT NULL, INDEX \`IDX_ae02308c93d865ed3dbaa6097f\` (\`categoryId\`), INDEX \`IDX_414c8fc7ae52afaf7b31750fac\` (\`productsId\`), PRIMARY KEY (\`categoryId\`, \`productsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_0455e8dce7cc9eaed9c3904946a\` FOREIGN KEY (\`product_brand_id\`) REFERENCES \`brand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lines_order\` ADD CONSTRAINT \`FK_123f6f68851db4753d0b4dfcfea\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lines_order\` ADD CONSTRAINT \`FK_9ef5e3a6853ec234d61b0c0e180\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_124456e637cca7a415897dce659\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_d72eb2a5bbff4f2533a5d4caff9\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_category\` ADD CONSTRAINT \`FK_8bc367fb7d5de5f3446b0ff708d\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`products_category\` ADD CONSTRAINT \`FK_bc2e048ffb4b013244d378ec161\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_products_products\` ADD CONSTRAINT \`FK_ae02308c93d865ed3dbaa6097f8\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_products_products\` ADD CONSTRAINT \`FK_414c8fc7ae52afaf7b31750facf\` FOREIGN KEY (\`productsId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category_products_products\` DROP FOREIGN KEY \`FK_414c8fc7ae52afaf7b31750facf\``);
        await queryRunner.query(`ALTER TABLE \`category_products_products\` DROP FOREIGN KEY \`FK_ae02308c93d865ed3dbaa6097f8\``);
        await queryRunner.query(`ALTER TABLE \`products_category\` DROP FOREIGN KEY \`FK_bc2e048ffb4b013244d378ec161\``);
        await queryRunner.query(`ALTER TABLE \`products_category\` DROP FOREIGN KEY \`FK_8bc367fb7d5de5f3446b0ff708d\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d72eb2a5bbff4f2533a5d4caff9\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_124456e637cca7a415897dce659\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`lines_order\` DROP FOREIGN KEY \`FK_9ef5e3a6853ec234d61b0c0e180\``);
        await queryRunner.query(`ALTER TABLE \`lines_order\` DROP FOREIGN KEY \`FK_123f6f68851db4753d0b4dfcfea\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_0455e8dce7cc9eaed9c3904946a\``);
        await queryRunner.query(`DROP INDEX \`IDX_414c8fc7ae52afaf7b31750fac\` ON \`category_products_products\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae02308c93d865ed3dbaa6097f\` ON \`category_products_products\``);
        await queryRunner.query(`DROP TABLE \`category_products_products\``);
        await queryRunner.query(`DROP INDEX \`IDX_bc2e048ffb4b013244d378ec16\` ON \`products_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_8bc367fb7d5de5f3446b0ff708\` ON \`products_category\``);
        await queryRunner.query(`DROP TABLE \`products_category\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP INDEX \`REL_d72eb2a5bbff4f2533a5d4caff\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_638bac731294171648258260ff\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`lines_order\``);
        await queryRunner.query(`DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP INDEX \`IDX_4c9fb58de893725258746385e1\` ON \`products\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`IDX_5f468ae5696f07da025138e38f\` ON \`brand\``);
        await queryRunner.query(`DROP TABLE \`brand\``);
    }

}
