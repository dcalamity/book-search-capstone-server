module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://lnfolpcpzyfsfw:acba2c2685229a49bf243819af8eb269db8560c73b69340591462f9a567d7272@ec2-18-235-97-230.compute-1.amazonaws.com:5432/d2iahe6o5dsh0j',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgres://lnfolpcpzyfsfw:acba2c2685229a49bf243819af8eb269db8560c73b69340591462f9a567d7272@ec2-18-235-97-230.compute-1.amazonaws.com:5432/d2iahe6o5dsh0j'

}