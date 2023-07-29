package com.mealtime.store.repository;

import com.mealtime.store.domain.Rider;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Rider entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RiderRepository extends JpaRepository<Rider, Long> {}
