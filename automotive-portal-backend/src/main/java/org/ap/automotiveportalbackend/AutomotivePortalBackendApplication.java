package org.ap.automotiveportalbackend;

import org.ap.automotiveportalbackend.common.DbMigration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(DbMigration.class)
public class AutomotivePortalBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(AutomotivePortalBackendApplication.class, args);
    }

}
