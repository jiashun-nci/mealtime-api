package com.mealtime.store.service;

import com.mealtime.store.domain.Rider;
import com.mealtime.store.repository.RiderRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Rider}.
 */
@Service
@Transactional
public class RiderService {

    private final Logger log = LoggerFactory.getLogger(RiderService.class);

    private final RiderRepository riderRepository;

    public RiderService(RiderRepository riderRepository) {
        this.riderRepository = riderRepository;
    }

    /**
     * Save a rider.
     *
     * @param rider the entity to save.
     * @return the persisted entity.
     */
    public Rider save(Rider rider) {
        log.debug("Request to save Rider : {}", rider);
        return riderRepository.save(rider);
    }

    /**
     * Update a rider.
     *
     * @param rider the entity to save.
     * @return the persisted entity.
     */
    public Rider update(Rider rider) {
        log.debug("Request to update Rider : {}", rider);
        return riderRepository.save(rider);
    }

    /**
     * Partially update a rider.
     *
     * @param rider the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Rider> partialUpdate(Rider rider) {
        log.debug("Request to partially update Rider : {}", rider);

        return riderRepository
            .findById(rider.getId())
            .map(existingRider -> {
                if (rider.getName() != null) {
                    existingRider.setName(rider.getName());
                }
                if (rider.getPhone() != null) {
                    existingRider.setPhone(rider.getPhone());
                }
                if (rider.getAvatar() != null) {
                    existingRider.setAvatar(rider.getAvatar());
                }
                if (rider.getAvatarContentType() != null) {
                    existingRider.setAvatarContentType(rider.getAvatarContentType());
                }

                return existingRider;
            })
            .map(riderRepository::save);
    }

    /**
     * Get all the riders.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Rider> findAll() {
        log.debug("Request to get all Riders");
        return riderRepository.findAll();
    }

    /**
     * Get one rider by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Rider> findOne(Long id) {
        log.debug("Request to get Rider : {}", id);
        return riderRepository.findById(id);
    }

    /**
     * Delete the rider by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Rider : {}", id);
        riderRepository.deleteById(id);
    }
}
