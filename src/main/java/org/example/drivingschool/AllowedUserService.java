package org.example.drivingschool;

import java.util.Arrays;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class AllowedUserService extends DefaultOAuth2UserService {

    private final Set<String> allowedEmails;

    public AllowedUserService(@Value("${app.allowed-emails:}") String allowedEmails) {
        this.allowedEmails = Arrays.stream(allowedEmails.split(","))
                .map(String::trim)
                .filter(email -> !email.isEmpty())
                .map(email -> email.toLowerCase(Locale.ROOT))
                .collect(Collectors.toUnmodifiableSet());
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User user = super.loadUser(userRequest);
        String email = user.getAttribute("email");
        if (email == null || !allowedEmails.contains(email.toLowerCase(Locale.ROOT))) {
            throw new OAuth2AuthenticationException(new OAuth2Error("not_allowed"), "Email not authorized: " + email);
        }
        return user;
    }
}