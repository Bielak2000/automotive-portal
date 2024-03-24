package org.ap.automotiveportalbackend.common;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.configuration.FluentConfiguration;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

@AllArgsConstructor
@Configuration
@Slf4j
public class DbMigration {

    private final DataSource dataSource;

    @PostConstruct
    public void migrate() {
        FluentConfiguration usersConfiguration = Flyway.configure()
                .dataSource(dataSource)
                .locations("classpath:db/migration");
        Flyway usersFlyway = new Flyway(usersConfiguration);
        log.info("Migrating automotive-portal.");
        usersFlyway.migrate();
        log.info("Migration of automotive-portal.");
    }
}
