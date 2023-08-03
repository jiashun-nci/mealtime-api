package com.mealtime.store.repository;

import com.mealtime.store.domain.Rider;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Rider entity.
 */
@Repository
public interface RiderRepository extends JpaRepository<Rider, Long> {
    default Optional<Rider> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Rider> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Rider> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct rider from Rider rider left join fetch rider.user",
        countQuery = "select count(distinct rider) from Rider rider"
    )
    Page<Rider> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct rider from Rider rider left join fetch rider.user")
    List<Rider> findAllWithToOneRelationships();

    @Query("select rider from Rider rider left join fetch rider.user where rider.id =:id")
    Optional<Rider> findOneWithToOneRelationships(@Param("id") Long id);
}
