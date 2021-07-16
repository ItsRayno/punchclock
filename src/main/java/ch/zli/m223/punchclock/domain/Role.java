package ch.zli.m223.punchclock.domain;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roleName;

    @OneToMany(targetEntity=ApplicationUser.class, mappedBy="role",cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ApplicationUser> applicationUsers = new ArrayList<>();

    public Role(String roleName, Long id) {
        this.roleName = roleName;
        this.id = id;
    }

    public Role() {

    }


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public List<ApplicationUser> getApplicationUsers() {
        return applicationUsers;
    }

    public void setApplicationUsers(List<ApplicationUser> applicationUsers) {
        this.applicationUsers = applicationUsers;
    }
}
