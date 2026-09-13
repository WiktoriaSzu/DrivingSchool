package org.example.drivingschool;

import java.util.Set;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class AllowedUserService extends DefaultOAuth2UserService {

    // quickest option: hardcode allowed emails here
    private static final Set<String> ALLOWED_EMAILS = Set.of(
            "szulikwiktoria99@gmail.com"
    );

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User user = super.loadUser(userRequest);
        String email = user.getAttribute("email");
        if (email == null || !ALLOWED_EMAILS.contains(email)) {
            throw new OAuth2AuthenticationException(new OAuth2Error("not_allowed"), "Email not authorized: " + email);
        }
        return user;
    }
}
