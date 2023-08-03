package com.mealtime.store.web.rest;

import com.mealtime.store.domain.Rider;
import com.mealtime.store.repository.RiderRepository;
import com.mealtime.store.service.RiderService;
import com.mealtime.store.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mealtime.store.domain.Rider}.
 */
@RestController
@RequestMapping("/api")
public class RiderResource {

    private final Logger log = LoggerFactory.getLogger(RiderResource.class);

    private static final String ENTITY_NAME = "rider";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RiderService riderService;

    private final RiderRepository riderRepository;

    public RiderResource(RiderService riderService, RiderRepository riderRepository) {
        this.riderService = riderService;
        this.riderRepository = riderRepository;
    }

    /**
     * {@code POST  /riders} : Create a new rider.
     *
     * @param rider the rider to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rider, or with status {@code 400 (Bad Request)} if the rider has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/riders")
    public ResponseEntity<Rider> createRider(@Valid @RequestBody Rider rider) throws URISyntaxException {
        log.debug("REST request to save Rider : {}", rider);
        if (rider.getId() != null) {
            throw new BadRequestAlertException("A new rider cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rider result = riderService.save(rider);
        return ResponseEntity
            .created(new URI("/api/riders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /riders/:id} : Updates an existing rider.
     *
     * @param id the id of the rider to save.
     * @param rider the rider to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rider,
     * or with status {@code 400 (Bad Request)} if the rider is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rider couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/riders/{id}")
    public ResponseEntity<Rider> updateRider(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Rider rider)
        throws URISyntaxException {
        log.debug("REST request to update Rider : {}, {}", id, rider);
        if (rider.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rider.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!riderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Rider result = riderService.update(rider);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rider.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /riders/:id} : Partial updates given fields of an existing rider, field will ignore if it is null
     *
     * @param id the id of the rider to save.
     * @param rider the rider to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rider,
     * or with status {@code 400 (Bad Request)} if the rider is not valid,
     * or with status {@code 404 (Not Found)} if the rider is not found,
     * or with status {@code 500 (Internal Server Error)} if the rider couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/riders/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Rider> partialUpdateRider(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Rider rider
    ) throws URISyntaxException {
        log.debug("REST request to partial update Rider partially : {}, {}", id, rider);
        if (rider.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rider.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!riderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Rider> result = riderService.partialUpdate(rider);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rider.getId().toString())
        );
    }

    /**
     * {@code GET  /riders} : get all the riders.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of riders in body.
     */
    @GetMapping("/riders")
    public ResponseEntity<List<Rider>> getAllRiders(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        @RequestParam(required = false, defaultValue = "false") boolean eagerload
    ) {
        log.debug("REST request to get a page of Riders");
        Page<Rider> page;
        if (eagerload) {
            page = riderService.findAllWithEagerRelationships(pageable);
        } else {
            page = riderService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /riders/:id} : get the "id" rider.
     *
     * @param id the id of the rider to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rider, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/riders/{id}")
    public ResponseEntity<Rider> getRider(@PathVariable Long id) {
        log.debug("REST request to get Rider : {}", id);
        Optional<Rider> rider = riderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(rider);
    }

    /**
     * {@code DELETE  /riders/:id} : delete the "id" rider.
     *
     * @param id the id of the rider to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/riders/{id}")
    public ResponseEntity<Void> deleteRider(@PathVariable Long id) {
        log.debug("REST request to delete Rider : {}", id);
        riderService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
