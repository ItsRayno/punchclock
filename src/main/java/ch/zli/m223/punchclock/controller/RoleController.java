package ch.zli.m223.punchclock.controller;

import ch.zli.m223.punchclock.domain.Entry;
import ch.zli.m223.punchclock.domain.Role;
import ch.zli.m223.punchclock.service.EntryService;
import ch.zli.m223.punchclock.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {
    private RoleService roleService;


    public RoleController(RoleService roleService) {

        this.roleService = roleService;
    }


    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Role> getAllEntries() {
        return roleService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Role createRole(@Valid @RequestBody Role role) {
        return roleService.createRole(role);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRole(@PathVariable("id") long id) {
        roleService.deleteRole(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Role updateRole(@Valid @RequestBody Role role) {
        return roleService.updateRole(role);
    }


}