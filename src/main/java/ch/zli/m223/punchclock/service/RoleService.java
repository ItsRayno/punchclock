package ch.zli.m223.punchclock.service;

import ch.zli.m223.punchclock.domain.ApplicationUser;
import ch.zli.m223.punchclock.domain.Entry;
import ch.zli.m223.punchclock.domain.Role;
import ch.zli.m223.punchclock.repository.ApplicationUserRepository;
import ch.zli.m223.punchclock.repository.RoleRepository;
import org.jvnet.hk2.annotations.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

import static java.util.Collections.emptyList;

@Service
public class RoleService{
    private RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
        LoadRoles();
    }

    private void LoadRoles() {

        roleRepository.save(new Role("Admin",new Long(1)));
        roleRepository.save(new Role("User",new Long(2)));

    }

    public Role createRole(Role role) {
        return roleRepository.saveAndFlush(role);
    }

    public List<Role> findAll() {
        return roleRepository.findAll();
    }
    public void deleteRole(long id) {
        roleRepository.deleteById(id);
    }
    public Role updateRole(Role role) {
        return roleRepository.save(role);
    }

}