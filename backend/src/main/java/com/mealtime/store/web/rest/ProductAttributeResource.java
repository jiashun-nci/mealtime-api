package com.mealtime.store.web.rest;

import com.mealtime.store.domain.ProductAttribute;
import com.mealtime.store.repository.ProductAttributeRepository;
import com.mealtime.store.service.ProductAttributeService;
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
 * REST controller for managing {@link com.mealtime.store.domain.ProductAttribute}.
 */
@RestController
@RequestMapping("/api")
public class ProductAttributeResource {

    private final Logger log = LoggerFactory.getLogger(ProductAttributeResource.class);

    private static final String ENTITY_NAME = "productAttribute";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductAttributeService productAttributeService;

    private final ProductAttributeRepository productAttributeRepository;

    public ProductAttributeResource(
        ProductAttributeService productAttributeService,
        ProductAttributeRepository productAttributeRepository
    ) {
        this.productAttributeService = productAttributeService;
        this.productAttributeRepository = productAttributeRepository;
    }

    /**
     * {@code POST  /product-attributes} : Create a new productAttribute.
     *
     * @param productAttribute the productAttribute to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productAttribute, or with status {@code 400 (Bad Request)} if the productAttribute has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/product-attributes")
    public ResponseEntity<ProductAttribute> createProductAttribute(@Valid @RequestBody ProductAttribute productAttribute)
        throws URISyntaxException {
        log.debug("REST request to save ProductAttribute : {}", productAttribute);
        if (productAttribute.getId() != null) {
            throw new BadRequestAlertException("A new productAttribute cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductAttribute result = productAttributeService.save(productAttribute);
        return ResponseEntity
            .created(new URI("/api/product-attributes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /product-attributes/:id} : Updates an existing productAttribute.
     *
     * @param id the id of the productAttribute to save.
     * @param productAttribute the productAttribute to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productAttribute,
     * or with status {@code 400 (Bad Request)} if the productAttribute is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productAttribute couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/product-attributes/{id}")
    public ResponseEntity<ProductAttribute> updateProductAttribute(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ProductAttribute productAttribute
    ) throws URISyntaxException {
        log.debug("REST request to update ProductAttribute : {}, {}", id, productAttribute);
        if (productAttribute.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, productAttribute.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productAttributeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ProductAttribute result = productAttributeService.update(productAttribute);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productAttribute.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /product-attributes/:id} : Partial updates given fields of an existing productAttribute, field will ignore if it is null
     *
     * @param id the id of the productAttribute to save.
     * @param productAttribute the productAttribute to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productAttribute,
     * or with status {@code 400 (Bad Request)} if the productAttribute is not valid,
     * or with status {@code 404 (Not Found)} if the productAttribute is not found,
     * or with status {@code 500 (Internal Server Error)} if the productAttribute couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/product-attributes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProductAttribute> partialUpdateProductAttribute(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ProductAttribute productAttribute
    ) throws URISyntaxException {
        log.debug("REST request to partial update ProductAttribute partially : {}, {}", id, productAttribute);
        if (productAttribute.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, productAttribute.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!productAttributeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProductAttribute> result = productAttributeService.partialUpdate(productAttribute);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productAttribute.getId().toString())
        );
    }

    /**
     * {@code GET  /product-attributes} : get all the productAttributes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productAttributes in body.
     */
    @GetMapping("/product-attributes")
    public ResponseEntity<List<ProductAttribute>> getAllProductAttributes(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of ProductAttributes");
        Page<ProductAttribute> page = productAttributeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /product-attributes/:id} : get the "id" productAttribute.
     *
     * @param id the id of the productAttribute to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productAttribute, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/product-attributes/{id}")
    public ResponseEntity<ProductAttribute> getProductAttribute(@PathVariable Long id) {
        log.debug("REST request to get ProductAttribute : {}", id);
        Optional<ProductAttribute> productAttribute = productAttributeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productAttribute);
    }

    /**
     * {@code DELETE  /product-attributes/:id} : delete the "id" productAttribute.
     *
     * @param id the id of the productAttribute to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/product-attributes/{id}")
    public ResponseEntity<Void> deleteProductAttribute(@PathVariable Long id) {
        log.debug("REST request to delete ProductAttribute : {}", id);
        productAttributeService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
