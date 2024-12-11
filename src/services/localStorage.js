const STORAGE_KEY = 'design-system-creator';

export const StorageService = {
  saveDesignSystem(system) {
    const systems = this.getAllDesignSystems();
    const updatedSystems = [...systems, { ...system, id: Date.now() }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSystems));
    return system;
  },

  getAllDesignSystems() {
    const systems = localStorage.getItem(STORAGE_KEY);
    return systems ? JSON.parse(systems) : [];
  },

  updateDesignSystem(id, updatedSystem) {
    const systems = this.getAllDesignSystems();
    const updatedSystems = systems.map(system => 
      system.id === id ? { ...system, ...updatedSystem } : system
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSystems));
    return updatedSystem;
  },

  deleteDesignSystem(id) {
    const systems = this.getAllDesignSystems();
    const filteredSystems = systems.filter(system => system.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSystems));
  }
};
